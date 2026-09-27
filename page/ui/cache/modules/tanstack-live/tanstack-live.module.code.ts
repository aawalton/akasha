"use client"

import { BOOT_GATE_TIMEOUT_MS } from "akasha/page/ui/cache/modules/boot-gate/boot-gate.module.code.ts"
import {
  ANSWERED_LISTINGS,
  answeredAll,
  type HeldSnapshots,
} from "akasha/page/ui/cache/modules/listing-readiness/listing-readiness.module.code.ts"
import type { ShapeDescriptor } from "akasha/page/ui-store/collection/modules/shape-descriptor/shape-descriptor.module.code.ts"
import type { PagesStore } from "akasha/page/ui-store/collection/modules/store/store.module.code.ts"
import { emitStoreDiagnostic } from "akasha/page/ui-store/modules/diagnostics/diagnostics.module.code.ts"
import {
  awaitPagesStoreReady,
  getPagesStore,
} from "akasha/page/ui-store/modules/singleton/singleton.module.code.ts"
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react"

type PagesCollection = PagesStore["collection"]

interface LivePipeline<R> {
  readonly read: () => R
  readonly subscribe: (cb: () => undefined) => () => undefined
  readonly dispose: () => undefined
}

interface AcquireResult {
  readonly ready: boolean
  readonly degraded: boolean
  readonly error: Error | null
}

export function useAcquireSlug(slug: string | undefined): AcquireResult {
  const [ready, setReady] = useState(slug === undefined || ANSWERED_LISTINGS.has(slug))
  const [degraded, setDegraded] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const reqRef = useRef(0)

  useEffect(() => {
    if (slug === undefined) {
      setReady(true)
      setDegraded(false)
      setError(null)
      return
    }
    const reqId = ++reqRef.current
    let acquired = false
    let settled = false
    setReady(ANSWERED_LISTINGS.has(slug))
    setDegraded(false)
    setError(null)
    const degradeTimer = setTimeout(() => {
      if (settled || reqId !== reqRef.current) return
      emitStoreDiagnostic({
        reason: "boot-gate-timeout",
        message: `[pages-cache] slug '${slug}' readiness overran ${BOOT_GATE_TIMEOUT_MS}ms — still waiting rather than drawing it empty`,
        detail: `gate=${acquired ? `slug:${slug}` : "store-ready (env/hydrate)"} elapsed>=${BOOT_GATE_TIMEOUT_MS}ms acquired=${acquired}`,
      })
      setDegraded(true)
    }, BOOT_GATE_TIMEOUT_MS)
    void (async () => {
      try {
        const store = await awaitPagesStoreReady()
        if (reqId !== reqRef.current) return
        store.acquireSlug(slug)
        acquired = true
        await store.whenSlugReady(slug)
        if (reqId !== reqRef.current) return
        ANSWERED_LISTINGS.answer(slug)
        settled = true
        clearTimeout(degradeTimer)
        setDegraded(false)
        setReady(true)
      } catch (err) {
        if (reqId !== reqRef.current) return
        settled = true
        clearTimeout(degradeTimer)
        setError(err instanceof Error ? err : new Error(String(err)))
        setDegraded(false)
        setReady(true)
      }
    })()
    return () => {
      reqRef.current++
      clearTimeout(degradeTimer)
      if (!acquired) return
      void (async () => {
        try {
          const store = await getPagesStore()
          store.releaseSlug(slug)
        } catch (err) {
          console.error("[pages-cache] releaseSlug failed", err)
        }
      })()
    }
  }, [slug])

  return { ready, degraded, error }
}

export function useAcquireSlugs(slugs: readonly string[] | undefined): AcquireResult {
  const unique = slugs === undefined ? [] : [...new Set(slugs.filter((s) => s.length > 0))].sort()
  const depsKey = unique.join("\0")
  const empty = unique.length === 0

  const [ready, setReady] = useState(empty || unique.every((one) => ANSWERED_LISTINGS.has(one)))
  const [degraded, setDegraded] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const reqRef = useRef(0)

  useEffect(() => {
    if (empty) {
      setReady(true)
      setDegraded(false)
      setError(null)
      return
    }
    const askedSlugs = depsKey.split("\0")
    let acquiredSlugs: readonly string[] = []
    const reqId = ++reqRef.current
    let acquired = false
    let settled = false
    setReady(askedSlugs.every((one) => ANSWERED_LISTINGS.has(one)))
    setDegraded(false)
    setError(null)
    const degradeTimer = setTimeout(() => {
      if (settled || reqId !== reqRef.current) return
      emitStoreDiagnostic({
        reason: "boot-gate-timeout",
        message: `[pages-cache] target slugs [${askedSlugs.join(", ")}] readiness overran ${BOOT_GATE_TIMEOUT_MS}ms — still waiting rather than drawing them empty`,
        detail: `gate=target-slugs elapsed>=${BOOT_GATE_TIMEOUT_MS}ms acquired=${acquired}`,
      })
      setDegraded(true)
    }, BOOT_GATE_TIMEOUT_MS)
    void (async () => {
      try {
        const store = await awaitPagesStoreReady()
        if (reqId !== reqRef.current) return
        const named = await store.rosterNamed(askedSlugs)
        if (reqId !== reqRef.current) return
        acquiredSlugs = named
        for (const slug of acquiredSlugs) store.acquireSlug(slug)
        acquired = true
        await Promise.all(acquiredSlugs.map((slug) => store.whenSlugReady(slug)))
        if (reqId !== reqRef.current) return
        for (const slug of askedSlugs) ANSWERED_LISTINGS.answer(slug)
        settled = true
        clearTimeout(degradeTimer)
        setDegraded(false)
        setReady(true)
      } catch (err) {
        if (reqId !== reqRef.current) return
        settled = true
        clearTimeout(degradeTimer)
        setError(err instanceof Error ? err : new Error(String(err)))
        setDegraded(false)
        setReady(true)
      }
    })()
    return () => {
      reqRef.current++
      clearTimeout(degradeTimer)
      if (!acquired) return
      void (async () => {
        try {
          const store = await getPagesStore()
          for (const slug of acquiredSlugs) store.releaseSlug(slug)
        } catch (err) {
          console.error("[pages-cache] releaseSlug (multi) failed", err)
        }
      })()
    }
  }, [depsKey, empty])

  return { ready, degraded, error }
}

export function useAcquireFilteredStream(descriptor: ShapeDescriptor | undefined): AcquireResult {
  const [ready, setReady] = useState(
    descriptor === undefined || ANSWERED_LISTINGS.has(descriptor.shapeKey)
  )
  const [error, setError] = useState<Error | null>(null)
  const reqRef = useRef(0)
  const shapeKey = descriptor?.shapeKey
  const depsKey = descriptor === undefined ? undefined : JSON.stringify(descriptor)

  useEffect(() => {
    if (descriptor === undefined || shapeKey === undefined) {
      setReady(true)
      setError(null)
      return
    }
    const reqId = ++reqRef.current
    let acquired = false
    setReady(ANSWERED_LISTINGS.has(shapeKey))
    setError(null)
    void (async () => {
      try {
        const store = await awaitPagesStoreReady()
        if (reqId !== reqRef.current) return
        store.acquireFilteredStream(descriptor)
        acquired = true
        await store.whenFilteredReady(shapeKey)
        if (reqId !== reqRef.current) return
        ANSWERED_LISTINGS.answer(shapeKey)
        setReady(true)
      } catch (err) {
        if (reqId !== reqRef.current) return
        setError(err instanceof Error ? err : new Error(String(err)))
        setReady(true)
      }
    })()
    return () => {
      reqRef.current++
      if (!acquired) return
      void (async () => {
        try {
          const store = await getPagesStore()
          store.releaseFilteredStream(shapeKey)
        } catch (err) {
          console.error("[pages-cache] releaseFilteredStream failed", err)
        }
      })()
    }
  }, [depsKey, shapeKey])

  return { ready, degraded: false, error }
}

export function shapesNamed(
  descriptors: readonly ShapeDescriptor[],
  named: readonly string[]
): readonly ShapeDescriptor[] {
  const reads = new Set(named)
  return descriptors.filter((one) => one.pageTypeSlug === undefined || reads.has(one.pageTypeSlug))
}

function pageTypesOf(descriptors: readonly ShapeDescriptor[]): readonly string[] {
  const slugs = new Set<string>()
  for (const one of descriptors) if (one.pageTypeSlug !== undefined) slugs.add(one.pageTypeSlug)
  return [...slugs]
}

function shapeKeysOf(descriptors: readonly ShapeDescriptor[]): readonly string[] {
  return descriptors.map((one) => one.shapeKey)
}

export function useAcquireShapes(descriptors: readonly ShapeDescriptor[]): {
  readonly ready: boolean
} {
  const depsKey = JSON.stringify(descriptors)
  const latest = useRef(descriptors)
  latest.current = descriptors
  const [answeredKey, setAnsweredKey] = useState<string | null>(null)
  useEffect(() => {
    const asked = depsKey === "" ? [] : latest.current
    if (asked.length === 0) return
    let held: readonly ShapeDescriptor[] = []
    let acquired = false
    let cancelled = false
    void (async () => {
      try {
        const store = await awaitPagesStoreReady()
        if (cancelled) return
        const named = await store.rosterNamed(pageTypesOf(asked))
        if (cancelled) return
        held = shapesNamed(asked, named)
        for (const one of held) store.acquireFilteredStream(one)
        acquired = true
        await Promise.all(held.map((one) => store.whenFilteredReady(one.shapeKey)))
        if (cancelled) return
        for (const key of shapeKeysOf(asked)) ANSWERED_LISTINGS.answer(key)
      } catch (err) {
        console.error("[pages-cache] acquireFilteredStream (multi) failed", err)
      }
      if (!cancelled) setAnsweredKey(depsKey)
    })()
    return () => {
      cancelled = true
      if (!acquired) return
      void (async () => {
        try {
          const store = await getPagesStore()
          for (const one of held) store.releaseFilteredStream(one.shapeKey)
        } catch (err) {
          console.error("[pages-cache] releaseFilteredStream (multi) failed", err)
        }
      })()
    }
  }, [depsKey])
  return {
    ready: answeredKey === depsKey || answeredAll(ANSWERED_LISTINGS, shapeKeysOf(descriptors)),
  }
}

interface PipelineLiveResult<R> {
  readonly snapshot: R | null
  readonly error: Error | null
}

const EMPTY_PIPELINE_RESULT: PipelineLiveResult<never> = { snapshot: null, error: null }

function toError(thrown: unknown): Error {
  return thrown instanceof Error ? thrown : new Error(String(thrown))
}

function heldResult<R>(held: HeldSnapshots<R> | undefined, key: string): PipelineLiveResult<R> {
  const kept = held?.get(key)
  return kept === undefined ? EMPTY_PIPELINE_RESULT : { snapshot: kept, error: null }
}

export function usePipelineLive<R>(
  makePipeline: (collection: PagesCollection) => LivePipeline<R>,
  depsKey: string,
  enabled: boolean,
  held?: HeldSnapshots<R>
): PipelineLiveResult<R> {
  const makeRef = useRef(makePipeline)
  makeRef.current = makePipeline
  const heldRef = useRef(held)
  heldRef.current = held

  const stateRef = useRef<PipelineLiveResult<R>>(heldResult(held, depsKey))
  const listenersRef = useRef<Set<() => void>>(new Set())
  const notify = useCallback(() => {
    for (const listener of listenersRef.current) listener()
  }, [])

  const readInto = useCallback((built: LivePipeline<R>, key: string) => {
    try {
      const snapshot = built.read()
      stateRef.current = { snapshot, error: null }
      heldRef.current?.hold(key, snapshot)
    } catch (thrown) {
      const error = toError(thrown)
      const isNew =
        stateRef.current.error === null || stateRef.current.error.message !== error.message
      stateRef.current = { snapshot: null, error }
      if (isNew) {
        console.error("[pages-cache] pipeline read() threw — surfacing to the view", error)
        emitStoreDiagnostic({
          reason: "view-read-throw",
          message: "[pages-cache] pipeline read() threw",
          detail: error.stack ?? error.message,
        })
      }
    }
  }, [])

  useEffect(() => {
    if (!enabled) {
      stateRef.current = EMPTY_PIPELINE_RESULT
      notify()
      return
    }
    const kept = heldResult(heldRef.current, depsKey)
    if (kept.snapshot !== null && stateRef.current.snapshot !== kept.snapshot) {
      stateRef.current = kept
      notify()
    }
    let cancelled = false
    let pipeline: LivePipeline<R> | null = null
    let unsubscribe: (() => undefined) | null = null
    void (async () => {
      let degradeTimer: ReturnType<typeof setTimeout> | null = null
      const bootTimeout = new Promise<PagesStore>((resolve) => {
        degradeTimer = setTimeout(() => {
          degradeTimer = null
          if (cancelled) return
          emitStoreDiagnostic({
            reason: "boot-gate-timeout",
            message: `[pages-cache] store readiness overran ${BOOT_GATE_TIMEOUT_MS}ms — building the pipeline over the current collection`,
            detail: `gate=store-ready (env/hydrate) elapsed>=${BOOT_GATE_TIMEOUT_MS}ms`,
          })
          void getPagesStore().then(resolve)
        }, BOOT_GATE_TIMEOUT_MS)
      })
      const store = await Promise.race([
        awaitPagesStoreReady().then((s) => {
          if (degradeTimer !== null) {
            clearTimeout(degradeTimer)
            degradeTimer = null
          }
          return s
        }),
        bootTimeout,
      ])
      if (cancelled) return
      const built = makeRef.current(store.collection)
      pipeline = built
      readInto(built, depsKey)
      unsubscribe = built.subscribe((): undefined => {
        if (cancelled) return undefined
        readInto(built, depsKey)
        notify()
        return undefined
      })
      notify()
    })()
    return () => {
      cancelled = true
      if (unsubscribe !== null) unsubscribe()
      if (pipeline !== null) pipeline.dispose()
    }
  }, [depsKey, enabled, notify, readInto])

  const subscribe = useCallback((listener: () => void) => {
    listenersRef.current.add(listener)
    return () => {
      listenersRef.current.delete(listener)
    }
  }, [])
  const getSnapshot = useCallback((): PipelineLiveResult<R> => stateRef.current, [])

  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}
