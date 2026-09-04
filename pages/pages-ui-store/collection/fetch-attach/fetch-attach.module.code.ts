import { isRecord } from "@akasha/utils-narrow/is-record"
import { emitStoreDiagnostic } from "../../diagnostics/diagnostics.module.code.ts"
import { PageRowSchema } from "../../realtime/payload-translator/payload-translator.module.code.ts"
import {
  foldSnapshotEntries,
  type SnapshotEntry,
} from "../../realtime/snapshot-fold/snapshot-fold.module.code.ts"
import type { PageRow } from "../page-row/page-row.module.code.ts"
import type { PagesSyncController } from "../sync-controller/sync-controller.module.code.ts"

export const FILE_BACKING_POLL_MS = 30_000

export type FetchImpl = (input: string, init?: RequestInit) => Promise<Response>

export interface FetchAttachDeps {
  readonly controller: PagesSyncController
  readonly getRow: (id: string) => PageRow | undefined
  readonly deliveredByShape: Map<string, Set<string>>
  readonly onShapeLive: (shapeKey: string) => undefined
  readonly fetchImpl: FetchImpl
  readonly pollMs: number
}

export interface FetchPlan {
  readonly inserts: readonly PageRow[]
  readonly updates: readonly PageRow[]
  readonly deletes: readonly string[]
}

export function filePagesPath(pageTypeSlug: string): string {
  return `/api/pages/${encodeURIComponent(pageTypeSlug)}`
}

export function canonicalJson(value: unknown): string {
  if (value === undefined) return "null"
  if (Array.isArray(value)) return `[${value.map(canonicalJson).join(",")}]`
  if (!isRecord(value)) return JSON.stringify(value)
  const parts: string[] = []
  for (const key of Object.keys(value).sort()) {
    const inner = value[key]
    if (inner === undefined) continue
    parts.push(`${JSON.stringify(key)}:${canonicalJson(inner)}`)
  }
  return `{${parts.join(",")}}`
}

export interface AnswerReach {
  readonly carried: number
  readonly held: number
}

export function readAnswerCut(body: unknown, carried: number): AnswerReach | null {
  if (!isRecord(body)) return null
  const held = body.held
  if (typeof held !== "number" || !Number.isFinite(held)) return null
  return held > carried ? { carried, held } : null
}

export function readAnswerRows(body: unknown): readonly PageRow[] | null {
  if (!isRecord(body)) return null
  const raw = body.rows
  if (!Array.isArray(raw)) return null
  const rows: PageRow[] = []
  for (const item of raw) {
    const parsed = PageRowSchema.safeParse(item)
    if (!parsed.success) return null
    rows.push(parsed.data)
  }
  return rows
}

export function planFetchedRows(
  fetched: readonly PageRow[],
  delivered: ReadonlySet<string>,
  getRow: (id: string) => PageRow | undefined
): FetchPlan {
  const entries: SnapshotEntry[] = fetched.map((row) => ({ kind: "upsert", row }))
  const present = new Set(fetched.map((row) => row.id))
  for (const id of delivered) {
    if (!present.has(id)) entries.push({ kind: "delete", id })
  }
  const { upserts, deletes } = foldSnapshotEntries(entries)
  const inserts: PageRow[] = []
  const updates: PageRow[] = []
  for (const row of upserts) {
    const held = getRow(row.id)
    if (held === undefined) {
      inserts.push(row)
      continue
    }
    if (canonicalJson(held) === canonicalJson(row)) continue
    updates.push(row)
  }
  return { inserts, updates, deletes }
}

export function attachFetch(deps: FetchAttachDeps, pageTypeSlug: string): () => undefined {
  const shapeKey = pageTypeSlug
  let stopped = false
  let timer: ReturnType<typeof setTimeout> | null = null

  const shapeSet = (): Set<string> => {
    const existing = deps.deliveredByShape.get(shapeKey)
    if (existing !== undefined) return existing
    const created = new Set<string>()
    deps.deliveredByShape.set(shapeKey, created)
    return created
  }

  const apply = (rows: readonly PageRow[]): undefined => {
    const set = shapeSet()
    const plan = planFetchedRows(rows, set, deps.getRow)
    try {
      if (plan.inserts.length > 0) deps.controller.seed(plan.inserts)
      if (plan.updates.length > 0) deps.controller.applyUpserts(plan.updates)
      if (plan.deletes.length > 0) deps.controller.applyDeletes(plan.deletes)
    } catch (err: unknown) {
      console.error(`pages-ui-store: file-backed fold failed shape=${shapeKey}`, err)
      return
    }
    for (const row of rows) set.add(row.id)
    for (const id of plan.deletes) set.delete(id)
    deps.onShapeLive(shapeKey)
  }

  const held = (): string =>
    `holding the ${deps.deliveredByShape.get(shapeKey)?.size ?? 0} row(s) already shown`

  const poll = async (): Promise<void> => {
    let response: Response
    try {
      response = await deps.fetchImpl(filePagesPath(pageTypeSlug), {
        headers: { accept: "application/json" },
      })
    } catch (err: unknown) {
      if (!stopped) {
        console.warn(`pages-ui-store: file-backed fetch failed shape=${shapeKey} — ${held()}`, err)
      }
      return
    }
    if (stopped) return
    if (!response.ok) {
      console.warn(
        `pages-ui-store: file-backed fetch answered ${response.status} shape=${shapeKey} — ${held()}`
      )
      return
    }
    let body: unknown
    try {
      body = await response.json()
    } catch (err: unknown) {
      if (!stopped) {
        console.warn(
          `pages-ui-store: file-backed answer was not JSON shape=${shapeKey} — ${held()}`,
          err
        )
      }
      return
    }
    if (stopped) return
    const rows = readAnswerRows(body)
    if (rows === null) {
      console.warn(
        `pages-ui-store: file-backed answer did not match the page row shape shape=${shapeKey} — ${held()}`
      )
      return
    }
    const cut = readAnswerCut(body, rows.length)
    if (cut !== null) {
      emitStoreDiagnostic({
        reason: "file-answer-cut",
        message: `[pages-ui-store] ${shapeKey} answered ${cut.carried} of ${cut.held} pages — this shape is short and nothing else says so`,
        detail: `shape=${shapeKey} carried=${cut.carried} held=${cut.held}`,
      })
    }
    apply(rows)
  }

  const tick = (): undefined => {
    void poll().finally(() => {
      if (stopped) return
      timer = setTimeout(tick, deps.pollMs)
    })
  }

  tick()

  return () => {
    stopped = true
    if (timer !== null) {
      clearTimeout(timer)
      timer = null
    }
  }
}
