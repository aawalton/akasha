import { RosterUnreachable } from "@akasha/pages-access/file-read"
import type { Collection } from "@tanstack/db"
import { emitStoreDiagnostic } from "../../diagnostics/diagnostics.module.code.ts"
import {
  computeProactiveRefreshDelayMs,
  PROACTIVE_REFRESH_MARGIN_MS,
} from "../../realtime/jwt-exp/jwt-exp.module.code.ts"
import { decodeJwtSub } from "../../realtime/jwt-sub/jwt-sub.module.code.ts"
import type { ShapeResumeState } from "../../realtime/shape-meta/shape-meta.module.code.ts"
import {
  type AcquireRegistry,
  acquireShape as acquireShapeIn,
  acquireSlug as acquireSlugIn,
  attachDetachedShapes,
  createAcquireRegistry,
  isShapeReady as isShapeReadyIn,
  isSlugReady as isSlugReadyIn,
  markSeededReady,
  markShapeReady,
  releaseShape as releaseShapeIn,
  releaseSlug as releaseSlugIn,
  whenShapeReady as whenShapeReadyIn,
  whenSlugReady as whenSlugReadyIn,
} from "../acquire/acquire.module.code.ts"
import {
  attachFetch,
  type FetchImpl,
  FILE_BACKING_POLL_MS,
} from "../fetch-attach/fetch-attach.module.code.ts"
import {
  type PageTypeBacking,
  type RosterAnswer,
  type RosterReader,
  rosterOverFetch,
} from "../file-backing/file-backing.module.code.ts"
import {
  applyIdentityChange,
  decideIdentityChange,
} from "../identity-change/identity-change.module.code.ts"
import { asPageRowList, type PageRow } from "../page-row/page-row.module.code.ts"
import { createPagesCollection } from "../pages-collection/pages-collection.module.code.ts"
import {
  buildPagesSnapshot,
  type PagesPersistencePort,
} from "../persistence/persistence.module.code.ts"
import {
  isDefinitionTierSlug,
  type ShapeDescriptor,
} from "../shape-descriptor/shape-descriptor.module.code.ts"

const ROSTER_RETRY_MS = 2_000

const canUnref = (timer: unknown): timer is { readonly unref: () => undefined } =>
  typeof timer === "object" &&
  timer !== null &&
  "unref" in timer &&
  typeof timer.unref === "function"

export interface FileBackingOptions {
  readonly fetchImpl?: FetchImpl
  readonly pollMs?: number
  readonly roster?: RosterReader
}

export interface StoreAuthArgs {
  readonly jwt: string | null
  readonly refreshAuth?: () => undefined | Promise<void>
}

export interface PagesStore {
  readonly collection: Collection<PageRow, string>
  readonly acquireSlug: (slug: string) => undefined
  readonly releaseSlug: (slug: string) => undefined
  readonly isSlugReady: (slug: string) => boolean
  readonly whenSlugReady: (slug: string) => Promise<void>
  readonly acquireFilteredStream: (descriptor: ShapeDescriptor) => undefined
  readonly releaseFilteredStream: (shapeKey: string) => undefined
  readonly isFilteredReady: (shapeKey: string) => boolean
  readonly whenFilteredReady: (shapeKey: string) => Promise<void>
  readonly setAuth: (args: StoreAuthArgs) => undefined
  readonly whenHydrated: Promise<void>
}

export function createPagesStore(
  persistence: PagesPersistencePort | null = null,
  saveDebounceMs = 250,
  onIdentityWipe: (() => undefined) | undefined = undefined,
  fileBacking: FileBackingOptions = {}
): PagesStore {
  let hydrating = persistence !== null
  let saveTimer: ReturnType<typeof setTimeout> | null = null
  let onMutation: (() => undefined) | undefined
  const handle = createPagesCollection(persistence === null ? undefined : () => onMutation?.())
  handle.collection.startSyncImmediate()
  const resume = new Map<string, ShapeResumeState>()

  const scheduleSave = (): undefined => {
    if (persistence === null || hydrating) return
    if (saveTimer !== null) clearTimeout(saveTimer)
    saveTimer = setTimeout(() => {
      saveTimer = null
      persistence.save(
        buildPagesSnapshot(asPageRowList(handle.collection.toArray), [...resume.entries()])
      )
    }, saveDebounceMs)
  }
  onMutation = scheduleSave
  const deliveredByShape = new Map<string, Set<string>>()

  let token: string | null = null
  let refreshAuth: (() => undefined | Promise<void>) | null = null
  let ownerSub: string | null = null
  let refreshInFlight = false
  let proactiveTimer: ReturnType<typeof setTimeout> | null = null
  let registryHolder: AcquireRegistry | null = null

  const fetchImpl: FetchImpl | null =
    fileBacking.fetchImpl ??
    (typeof globalThis.fetch === "function" ? (input, init) => globalThis.fetch(input, init) : null)
  const pollMs = fileBacking.pollMs ?? FILE_BACKING_POLL_MS
  const readRoster: RosterReader | null =
    fileBacking.roster ?? (fetchImpl === null ? null : rosterOverFetch(fetchImpl))

  let roster: RosterAnswer | null =
    readRoster === null
      ? new RosterUnreachable("this store was given no way to fetch the roster")
      : null
  let rosterAsked = false
  const rosterWaiting = new Set<() => undefined>()

  const retryRoster = (): undefined => {
    const timer = setTimeout(askRoster, ROSTER_RETRY_MS)
    if (canUnref(timer)) timer.unref()
  }

  const askRoster = (): undefined => {
    if (rosterAsked || readRoster === null) return
    rosterAsked = true
    void readRoster()
      .catch((err: unknown) => new RosterUnreachable(String(err)))
      .then((got) => {
        roster = got
        if (got instanceof RosterUnreachable) {
          rosterAsked = false
          console.warn("[pages-ui-store] the file-backed roster went unread", got.why)
          if (rosterWaiting.size > 0) retryRoster()
          return
        }
        const waiting = [...rosterWaiting]
        rosterWaiting.clear()
        for (const wake of waiting) wake()
      })
  }

  const backingOf = (pageTypeSlug: string): PageTypeBacking | null => {
    if (roster === null || roster instanceof RosterUnreachable) return null
    return roster.has(pageTypeSlug) ? "file" : "unknown"
  }

  const onAuthStale = (): undefined => {
    const refresh = refreshAuth
    if (refresh === null || refreshInFlight) return
    refreshInFlight = true
    void (async () => {
      try {
        await refresh()
      } catch (err: unknown) {
        console.warn("[pages-ui-store] auth-stale refresh failed", err)
      } finally {
        refreshInFlight = false
      }
    })()
  }

  const armProactiveRefresh = (): undefined => {
    if (proactiveTimer !== null) {
      clearTimeout(proactiveTimer)
      proactiveTimer = null
    }
    if (token === null) return
    const delay = computeProactiveRefreshDelayMs(token, Date.now(), PROACTIVE_REFRESH_MARGIN_MS)
    if (delay === null) return
    proactiveTimer = setTimeout(() => {
      proactiveTimer = null
      onAuthStale()
    }, delay)
  }

  const emptyTierReported = new Set<string>()
  const unbackedReported = new Set<string>()

  const rosterState = (): string => {
    if (roster === null) return "unread"
    return roster instanceof RosterUnreachable ? "unreachable" : "read"
  }

  const markLive = (shapeKey: string): undefined => {
    if (
      isDefinitionTierSlug(shapeKey) &&
      (deliveredByShape.get(shapeKey)?.size ?? 0) === 0 &&
      !emptyTierReported.has(shapeKey)
    ) {
      emptyTierReported.add(shapeKey)
      emitStoreDiagnostic({
        reason: "definition-tier-empty",
        message: `[pages-ui-store] ${shapeKey} went live carrying no pages — the definition tier is empty, so every page type, column and view now resolves against nothing and readiness says otherwise`,
        detail: `shape=${shapeKey} rows=0 roster=${rosterState()}`,
      })
    }
    if (registryHolder !== null) markShapeReady(registryHolder, shapeKey)
  }

  const attachEmpty = (shapeKey: string): (() => undefined) => {
    markLive(shapeKey)
    return () => undefined
  }

  const attachUnbacked = (pageTypeSlug: string): (() => undefined) => {
    if (!unbackedReported.has(pageTypeSlug)) {
      unbackedReported.add(pageTypeSlug)
      emitStoreDiagnostic({
        reason: "page-type-unbacked",
        message: `[pages-ui-store] ${pageTypeSlug} is not a page type the roster names, so no road to its pages is known; this store refuses to guess one, and every query against it answers nothing`,
        detail: `shape=${pageTypeSlug} roster=${rosterState()}`,
      })
    }
    return attachEmpty(pageTypeSlug)
  }

  const attachFileBacked = (pageTypeSlug: string): (() => undefined) | null => {
    if (fetchImpl === null) return null
    return attachFetch(
      {
        controller: handle.controller,
        getRow: (id) => handle.collection.get(id),
        deliveredByShape,
        onShapeLive: markLive,
        fetchImpl,
        pollMs,
      },
      pageTypeSlug
    )
  }

  const attach = (descriptor: ShapeDescriptor): (() => undefined) | null => {
    if (token === null) return null
    const { pageTypeSlug, shapeKey } = descriptor
    if (pageTypeSlug === undefined) return attachEmpty(shapeKey)
    askRoster()
    const backing = backingOf(pageTypeSlug)
    if (backing === "file") return attachFileBacked(pageTypeSlug)
    if (backing === "unknown") return attachUnbacked(pageTypeSlug)

    const named: string = pageTypeSlug
    let current: (() => undefined) | null = null
    let settled = false
    const wake = (): undefined => {
      reconsider()
    }
    rosterWaiting.add(wake)
    function reconsider(): undefined {
      if (settled) return
      const decided: PageTypeBacking | null = backingOf(named)
      if (decided === null) return
      settled = true
      rosterWaiting.delete(wake)
      current = decided === "file" ? attachFileBacked(named) : attachUnbacked(named)
    }
    return () => {
      settled = true
      rosterWaiting.delete(wake)
      current?.()
    }
  }

  const registry = createAcquireRegistry(attach)
  registryHolder = registry

  const whenHydrated: Promise<void> =
    persistence === null
      ? Promise.resolve()
      : (async () => {
          try {
            const snapshot = await persistence.load()
            if (snapshot !== null) {
              handle.controller.seed(snapshot.rows)
              for (const row of snapshot.rows) {
                let set = deliveredByShape.get(row.page_type_slug)
                if (set === undefined) {
                  set = new Set()
                  deliveredByShape.set(row.page_type_slug, set)
                }
                set.add(row.id)
              }
              for (const [shapeKey, state] of snapshot.resume) {
                if (isDefinitionTierSlug(shapeKey)) continue
                resume.set(shapeKey, state)
              }
              markSeededReady(registry)
            }
          } catch (err: unknown) {
            console.warn("[pages-ui-store] persistence hydrate failed", err)
          } finally {
            hydrating = false
          }
        })()

  return {
    collection: handle.collection,
    whenHydrated,
    acquireSlug: (slug) => acquireSlugIn(registry, slug),
    releaseSlug: (slug) => releaseSlugIn(registry, slug),
    isSlugReady: (slug) => isSlugReadyIn(registry, slug),
    whenSlugReady: (slug) => whenSlugReadyIn(registry, slug),
    acquireFilteredStream: (descriptor) => acquireShapeIn(registry, descriptor),
    releaseFilteredStream: (shapeKey) => releaseShapeIn(registry, shapeKey),
    isFilteredReady: (shapeKey) => isShapeReadyIn(registry, shapeKey),
    whenFilteredReady: (shapeKey) => whenShapeReadyIn(registry, shapeKey),
    setAuth: (args) => {
      const incomingSub = args.jwt === null ? null : decodeJwtSub(args.jwt)
      const decision = decideIdentityChange(ownerSub, incomingSub)
      applyIdentityChange(decision, handle.controller, resume, deliveredByShape)
      if (decision.wipe) {
        persistence?.clear()
        onIdentityWipe?.()
      }
      ownerSub = decision.nextOwnerSub
      const hadToken = token !== null
      token = args.jwt
      if (args.refreshAuth !== undefined) refreshAuth = args.refreshAuth
      armProactiveRefresh()
      if (!hadToken && args.jwt !== null) attachDetachedShapes(registry)
    },
  }
}
