import { asPage, type Page, type PageWhere } from "@akasha/pages-core/page-types"
import type { Asked, Query } from "@akasha/pages-system-service/asking"
import { askingFor } from "@akasha/pages-system-service/calling"
import { isJson } from "@akasha/utils-narrow/is-json"
import type { Json } from "@akasha/utils-narrow/json-value"
import { type CursorPayload, decodeCursor, encodeCursor } from "../cursor/cursor.module.code.ts"
import {
  askableNarrows,
  declaredAs,
  declares,
  fieldFor,
  matches,
  narrowing,
  ranked,
} from "../file-narrow/file-narrow.module.code.ts"
import { buildRawPageRows } from "../file-rows/file-rows.module.code.ts"
import type { PropertyDefinition } from "../page-type-config/page-type-config.module.code.ts"
import { flattenRow } from "../routing-core/routing-core.module.code.ts"
import type { PageCursor, PageOrder, PageSelect } from "../types/types.module.code.ts"

export type FileReadShape = {
  readonly pageTypeId: string
  readonly definitions: readonly PropertyDefinition[]
  readonly ownerSlug?: string
}

export type FileReadDeps = {
  readonly ask: (query: Query) => Promise<Asked>
  readonly roster: () => Promise<ReadonlySet<string>>
}

const NON_NULLABLE_ORDER_KEYS: ReadonlySet<string> = new Set([
  "id",
  "seq",
  "createdAt",
  "updatedAt",
])

const ALSO_READ: Readonly<Record<string, string>> = {
  status: "status",
  completedAt: "completed_at",
  favoritedAt: "favorited_at",
  lastViewedAt: "last_viewed_at",
}

const PAGE_TYPE = "page-type"

const ROSTER_HELD_MS = 60_000

const NO_ROSTER =
  "the page types `@akasha/pages-system-service` lists are the page types whose pages it holds as files, and that listing did not come back"

const NO_PAGE_TYPE =
  "`@akasha/pages-system-service` listed no page type at all, and an empty roster would read as a tree where no page is a file"

export function pageOf(raw: Readonly<Record<string, unknown>>): Page {
  const page = flattenRow({ ...raw })
  const alsoRead: Record<string, Json> = {}
  for (const [key, column] of Object.entries(ALSO_READ)) {
    const value = raw[column]
    if (value === null || value === undefined || page[key] !== undefined) continue
    if (isJson(value)) alsoRead[key] = value
  }
  return Object.keys(alsoRead).length === 0 ? page : asPage({ ...page, ...alsoRead })
}

export class RosterUnreachable extends Error {
  readonly why: string
  constructor(why: string) {
    super(
      `what is file-backed went unread, so nothing can be said to be file-backed or not: ${why}`
    )
    this.name = "RosterUnreachable"
    this.why = why
  }
}

let known: ReadonlySet<string> | null = null
let knownAt = 0
let pending: Promise<ReadonlySet<string>> | null = null

export function forgetFileBackedPageTypes(): undefined {
  known = null
  knownAt = 0
  pending = null
}

async function rosterFrom(ask: (query: Query) => Promise<Asked>): Promise<ReadonlySet<string>> {
  const asked = await ask({ pageTypeSlug: PAGE_TYPE, keys: ["slug"] })
  if ("refused" in asked) throw new RosterUnreachable(`${NO_ROSTER}: ${asked.refused}`)
  const slugs = new Set<string>()
  for (const row of asked.rows) {
    const slug = row.slug
    if (typeof slug === "string" && slug !== "") slugs.add(slug)
  }
  if (slugs.size === 0) throw new RosterUnreachable(NO_PAGE_TYPE)
  return slugs
}

export async function fileBackedPageTypes(
  ask: (query: Query) => Promise<Asked> = askingFor
): Promise<ReadonlySet<string>> {
  if (known !== null && Date.now() - knownAt < ROSTER_HELD_MS) return known
  pending ??= rosterFrom(ask).then(
    (slugs) => {
      pending = null
      known = slugs
      knownAt = Date.now()
      return slugs
    },
    (thrown: unknown) => {
      pending = null
      throw thrown
    }
  )
  return pending
}

export async function isFileBacked(pageTypeSlug: string): Promise<boolean> {
  return (await fileBackedPageTypes()).has(pageTypeSlug)
}

const LIVE: FileReadDeps = { ask: (query) => askingFor(query), roster: fileBackedPageTypes }

function comparing(order: PageOrder): (left: Page, right: Page) => number {
  const steps: PageOrder = [...order, { by: "id", dir: "asc" }]
  return (left, right) => {
    for (const step of steps) {
      const a = left[step.by]
      const b = right[step.by]
      const way = step.dir === "asc" ? 1 : -1
      const nullsFirst = NON_NULLABLE_ORDER_KEYS.has(step.by)
        ? step.dir !== "asc"
        : step.dir === "asc"
      const aGone = a === null || a === undefined
      const bGone = b === null || b === undefined
      if (aGone && bGone) continue
      if (aGone) return nullsFirst ? -1 : 1
      if (bGone) return nullsFirst ? 1 : -1
      const verdict = ranked(a, b)
      if (verdict !== 0) return way * verdict
    }
    return 0
  }
}

function ordered(rows: readonly Page[], order: PageOrder): readonly Page[] {
  return [...rows].sort(comparing(order))
}

export type GetFilePagesArgs = {
  readonly pageTypeSlug: string
  readonly shape: FileReadShape
  readonly where?: PageWhere
  readonly select?: PageSelect
  readonly order?: PageOrder
  readonly limit?: number
  readonly offset?: number
  readonly cursor?: PageCursor
  readonly withCount?: boolean
}

export type FilePagesResult = {
  readonly rows: readonly Page[]
  readonly nextCursor: PageCursor | null
  readonly count: number | null
}

const DEFAULT_FILE_ORDER: PageOrder = [{ by: "seq", dir: "asc" }]

const HELD_IDLE_MS = 60_000
const HELD_ROWS = 200_000

type HeldPages = { readonly over: string; readonly rows: readonly Page[]; touched: number }

const held = new Map<string, HeldPages>()
let MINTED = 0

function heldRows(): number {
  let rows = 0
  for (const one of held.values()) rows += one.rows.length
  return rows
}

function prune(now: number, keep: string): undefined {
  for (const [token, one] of held) {
    if (now - one.touched > HELD_IDLE_MS) held.delete(token)
  }
  while (held.size > 1 && heldRows() > HELD_ROWS) {
    let oldest: string | null = null
    let at = Number.POSITIVE_INFINITY
    for (const [token, one] of held) {
      if (token !== keep && one.touched < at) {
        at = one.touched
        oldest = token
      }
    }
    if (oldest === null) break
    held.delete(oldest)
  }
}

function runKey(args: GetFilePagesArgs, order: PageOrder): string {
  return JSON.stringify({
    type: args.pageTypeSlug,
    pageTypeId: args.shape.pageTypeId,
    where: args.where ?? null,
    order,
  })
}

function heldFor(token: string | undefined, over: string): readonly Page[] | null {
  if (token === undefined) return null
  const one = held.get(token)
  if (one === undefined || one.over !== over) return null
  one.touched = Date.now()
  return one.rows
}

function hold(token: string | undefined, over: string, rows: readonly Page[]): string {
  const now = Date.now()
  const at = token !== undefined && held.get(token)?.over === over ? token : `run-${++MINTED}`
  held.set(at, { over, rows, touched: now })
  prune(now, at)
  return at
}

function markerOf(order: PageOrder, at: CursorPayload): Page {
  const mark: Record<string, Json> = {}
  order.forEach((step, index) => {
    mark[step.by] = at.values[index] ?? null
  })
  mark.id = at.id
  return asPage(mark)
}

function resumeAt(sorted: readonly Page[], order: PageOrder, at: CursorPayload): number {
  const guess = at.index
  if (guess !== undefined && guess >= 0 && sorted[guess]?.id === at.id) return guess + 1
  const compare = comparing(order)
  const mark = markerOf(order, at)
  const after = sorted.findIndex((page) => compare(page, mark) > 0)
  return after < 0 ? sorted.length : after
}

function narrowedKeys(
  where: PageWhere,
  into: Set<string>,
  definitions: readonly PropertyDefinition[]
): undefined {
  for (const condition of where) {
    if ("or" in condition) {
      narrowedKeys(condition.or, into, definitions)
      continue
    }
    into.add(declaredAs(condition.key, definitions))
  }
}

function keysWanted(args: GetFilePagesArgs, order: PageOrder): readonly string[] | null {
  const select = args.select
  if (select === undefined) return null
  const definitions = args.shape.definitions
  const wanted = new Set<string>(["id", "slug", "title"])
  for (const key of select) wanted.add(declaredAs(key, definitions))
  for (const step of order) {
    if (declares(step.by, definitions)) wanted.add(declaredAs(step.by, definitions))
  }
  narrowedKeys(args.where ?? [], wanted, definitions)
  return [...wanted]
}

type Selection = readonly (readonly [string, string])[]

function selecting(
  select: PageSelect | undefined,
  definitions: readonly PropertyDefinition[]
): Selection | null {
  if (select === undefined) return null
  return select.map((key) => [key, fieldFor(key, definitions)] as const)
}

function selectedFrom(page: Page, selection: Selection | null): Page {
  if (selection === null) return page
  const out: Record<string, Json> = {}
  for (const [key, field] of selection) out[key] = page[field] ?? null
  return asPage(out)
}

export function valuedRows(
  rows: readonly Readonly<Record<string, unknown>>[]
): readonly { readonly values: Record<string, unknown> }[] {
  return rows.map((one) => ({ values: { ...one } }))
}

async function wholePopulation(
  args: GetFilePagesArgs,
  order: PageOrder,
  deps: FileReadDeps
): Promise<readonly Page[]> {
  const tests = narrowing(args.where, args.shape.definitions)
  const keys = keysWanted(args, order)
  const query: Query = {
    pageTypeSlug: args.pageTypeSlug,
    ...(keys === null ? {} : { keys }),
    ...(tests === null ? {} : { where: tests }),
  }
  const asked = await deps.ask(query)
  if ("refused" in asked) {
    throw new Error(`getFilePages(${args.pageTypeSlug}): ${asked.refused}`)
  }
  const raw = buildRawPageRows({
    rows: valuedRows(asked.rows),
    definitions: args.shape.definitions,
    pageTypeId: args.shape.pageTypeId,
    pageTypeSlug: args.pageTypeSlug,
  })
  const flat = raw.map((row) => pageOf({ ...row }))
  const kept = (args.where ?? []).reduce<readonly Page[]>(
    (rows, condition) => rows.filter((page) => matches(page, condition, args.shape.definitions)),
    flat
  )
  return ordered(kept, order)
}

export async function getFilePages(
  given: GetFilePagesArgs,
  deps: FileReadDeps = LIVE
): Promise<FilePagesResult> {
  const args: GetFilePagesArgs = {
    ...given,
    where: askableNarrows(given.where, given.shape.ownerSlug ?? null).where,
  }
  const order = args.order ?? DEFAULT_FILE_ORDER
  const over = runKey(args, order)
  const resuming = args.cursor === undefined ? null : decodeCursor(args.cursor)
  const sorted = heldFor(resuming?.snapshot, over) ?? (await wholePopulation(args, order, deps))

  const from = resuming === null ? (args.offset ?? 0) : resumeAt(sorted, order, resuming)
  const upto = args.limit === undefined ? sorted.length : from + args.limit
  const window = sorted.slice(from, upto)
  const end = from + window.length
  const last = window.at(-1)

  let nextCursor: PageCursor | null = null
  if (end < sorted.length && last !== undefined) {
    nextCursor = encodeCursor({
      values: order.map((step) => last[step.by] ?? null),
      id: typeof last.id === "string" ? last.id : "",
      snapshot: hold(resuming?.snapshot, over, sorted),
      index: end - 1,
    })
  }

  const selection = selecting(args.select, args.shape.definitions)
  return {
    rows: window.map((page) => selectedFrom(page, selection)),
    nextCursor,
    count: args.withCount === true ? sorted.length : null,
  }
}

const ID_SUFFIX_LENGTH = 8

export type GetFilePagesByIdSuffixArgs = {
  readonly pageTypeSlug: string
  readonly shape: FileReadShape
  readonly idSuffix: string
}

export async function getFilePagesByIdSuffix(
  args: GetFilePagesByIdSuffixArgs,
  deps: FileReadDeps = LIVE
): Promise<readonly Page[]> {
  const asked = await deps.ask({
    pageTypeSlug: args.pageTypeSlug,
    where: { id: { "ends-with": args.idSuffix } },
  })
  if ("refused" in asked) {
    throw new Error(`getFilePagesByIdSuffix(${args.pageTypeSlug}): ${asked.refused}`)
  }
  const raw = buildRawPageRows({
    rows: valuedRows(asked.rows),
    definitions: args.shape.definitions,
    pageTypeId: args.shape.pageTypeId,
    pageTypeSlug: args.pageTypeSlug,
  })
  const found = raw
    .map((row) => pageOf({ ...row }))
    .filter(
      (page) => typeof page.id === "string" && page.id.slice(-ID_SUFFIX_LENGTH) === args.idSuffix
    )
  return ordered(found, [{ by: "id", dir: "asc" }])
}

export type GetFilePageByIdSuffixArgs = GetFilePagesByIdSuffixArgs & {
  readonly slug?: string
  readonly select?: PageSelect
}

export async function getFilePageByIdSuffix(
  args: GetFilePageByIdSuffixArgs,
  deps: FileReadDeps = LIVE
): Promise<Page | null> {
  const matched = await getFilePagesByIdSuffix(args, deps)
  const one = pickOne(matched, args.slug, `page-type '${args.pageTypeSlug}'`)
  return one === null ? null : selectedFrom(one, selecting(args.select, args.shape.definitions))
}

export function pickOne(
  matched: readonly Page[],
  slug: string | undefined,
  where: string
): Page | null {
  if (matched.length === 0) return null
  const first = matched[0]
  if (matched.length === 1 && first !== undefined) return first
  const ids = matched.map((page) => String(page.id)).join(", ")
  if (slug !== undefined) {
    const bySlug = matched.filter((page) => page.slug === slug)
    const only = bySlug[0]
    if (bySlug.length === 1 && only !== undefined) return only
    throw new Error(
      `getFilePageByIdSuffix: ambiguous suffix for ${where} with slug '${slug}': ${bySlug.length} of ${matched.length} candidates match (candidate ids: ${ids})`
    )
  }
  throw new Error(
    `getFilePageByIdSuffix: ambiguous suffix for ${where}: ${matched.length} candidates match and no slug tiebreaker was supplied (candidate ids: ${ids})`
  )
}

export async function getFilePage(
  args: Omit<GetFilePagesArgs, "limit" | "offset" | "withCount">,
  deps: FileReadDeps = LIVE
): Promise<Page | null> {
  const got = await getFilePages({ ...args, limit: 2 }, deps)
  if (got.rows.length === 0) return null
  if (got.rows.length > 1) {
    throw new Error(
      `getFilePage(${args.pageTypeSlug}): expected at most one page, got ${got.rows.length}`
    )
  }
  return got.rows[0] ?? null
}
