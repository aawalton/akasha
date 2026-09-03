import {
  asPage,
  type Page,
  type PageCondition,
  type PageWhere,
} from "@akasha/pages-core/page-types"
import type { Asked, Query, Row, Test } from "@akasha/pages-system-service/asking"
import {
  askingFor,
  readingFor,
  type Writing,
  writingFor,
} from "@akasha/pages-system-service/calling"
import type { Read, Asked as Sought } from "@akasha/pages-system-service/reading"
import type { Wrote } from "@akasha/pages-system-service/writing"
import { z } from "zod"
import { FileWriteError } from "../file-write-error/file-write-error.module.code.ts"
import type { PageSelect } from "../types/types.module.code.ts"

const DEFAULT_WRITER = "pages-access"

const SUBAGENT_MARK = "--"

const ENV_TEXT = z.string().optional()

const WRITER_HOST = "alanwalton.com"

const SLUG = "slug"

const ID = "id"

const NO_WRITE_PATH =
  "`@akasha/pages-system-service` writes a page by its page type, its slug and its values, and places the page from the index rather than from a name a caller works out."

export type FileWriteDeps = {
  readonly ask: (query: Query) => Promise<Asked>
  readonly read: (sought: Sought) => Promise<Read>
  readonly write: (asked: Writing) => Promise<Wrote>
}

export const LIVE: FileWriteDeps = {
  ask: (query) => askingFor(query),
  read: (sought) => readingFor(sought),
  write: (asked) => writingFor(asked),
}

function actingUnder(seat: string | undefined): string | undefined {
  const acting = ENV_TEXT.parse(process.env.ACTING_AGENT_ID)
  if (seat === undefined || acting === undefined) return undefined
  return acting.startsWith(`${seat}${SUBAGENT_MARK}`) ? acting : undefined
}

export function writerOf(stated: string | undefined): string {
  const seat = ENV_TEXT.parse(process.env.AGENT_ID)
  const writer = ENV_TEXT.parse(process.env.PAGE_WRITER)
  const named = stated ?? writer ?? actingUnder(seat) ?? seat
  return named === undefined || named.trim() === "" ? DEFAULT_WRITER : named.trim()
}

// A write names its writer as a name and an address — `page-writing` refuses every other shape
// (`refusalIn`). What this package holds is a bare name, so the address is composed from it.
export function writerLine(stated: string | undefined): string {
  const named = writerOf(stated).replace(/[<>\s]+/g, "-")
  return `${named} <${named}@${WRITER_HOST}>`
}

export function refuseJsonPatch(op: string, pageTypeSlug: string, patch: unknown): undefined {
  if (patch === undefined) return
  throw new FileWriteError(
    pageTypeSlug,
    `${op}(${pageTypeSlug}): this page type's pages are files, and a JSON patch addresses a path inside a row's attributes, which a file has no equivalent of. Set the whole property instead.`
  )
}

function textOf(value: unknown): string | null {
  if (typeof value === "string") return value
  if (typeof value === "number" || typeof value === "boolean") return String(value)
  return null
}

function textsOf(values: readonly unknown[]): readonly string[] | null {
  const out: string[] = []
  for (const one of values) {
    const said = textOf(one)
    if (said === null) return null
    out.push(said)
  }
  return out
}

export type Lowered = { readonly key: string; readonly test: Test } | { readonly refused: string }

// EVERY CONDITION IS LOWERED OR THE WRITE IS REFUSED. Nothing here drops a condition it cannot
// carry. The road this replaces narrowed through `askableNarrows`, which strips a condition on a
// key the repository settles rather than lowering it, so a scoped read widened to every account's
// rows instead of matching none — see
// `finding/lifting-the-shape-tombstone-uncovers-a-read-that-crosses-accounts`. On a write that
// same strip would reach pages the caller never named, so a narrow this cannot carry refuses.
export function loweredFrom(condition: PageCondition): Lowered {
  if ("or" in condition) {
    return {
      refused:
        "an `or` of conditions, and a question asked of `@akasha/pages-system-service` tests each key on its own",
    }
  }
  const key = condition.key
  const noScalar = { refused: `\`${key}\` is tested against what is no string, number or boolean` }
  const noList = { refused: `\`${key}\` is tested against a list holding what is no string` }
  if ("eq" in condition) {
    if (condition.eq === null) return { key, test: { empty: true } }
    const one = textOf(condition.eq)
    return one === null ? noScalar : { key, test: { is: one } }
  }
  if ("isNull" in condition) return { key, test: { empty: true } }
  if ("isEmpty" in condition) return { key, test: { empty: true } }
  if ("isNotEmpty" in condition) return { key, test: { empty: false } }
  if ("in" in condition) {
    const many = textsOf(condition.in)
    return many === null ? noList : { key, test: { in: many } }
  }
  if ("notIn" in condition) {
    const many = textsOf(condition.notIn)
    return many === null ? noList : { key, test: { "not-in": many } }
  }
  if ("neq" in condition) {
    const one = textOf(condition.neq)
    return one === null ? noScalar : { key, test: { "not-in": [one] } }
  }
  if ("contains" in condition) return { key, test: { contains: condition.contains } }
  if ("includes" in condition) {
    const one = textOf(condition.includes)
    return one === null ? noScalar : { key, test: { has: one } }
  }
  if ("lt" in condition) {
    const one = textOf(condition.lt)
    return one === null ? noScalar : { key, test: { before: one } }
  }
  if ("lte" in condition) {
    const one = textOf(condition.lte)
    return one === null ? noScalar : { key, test: { "at-or-before": one } }
  }
  if ("gt" in condition) {
    const one = textOf(condition.gt)
    return one === null ? noScalar : { key, test: { after: one } }
  }
  if ("gte" in condition) {
    const one = textOf(condition.gte)
    return one === null ? noScalar : { key, test: { "at-or-after": one } }
  }
  return {
    refused: `\`${key}\` is tested by something \`@akasha/pages-system-service\` runs no test for`,
  }
}

export type Narrowed =
  | { readonly where: Readonly<Record<string, Test>> }
  | { readonly refused: string }

export function narrowedFrom(where: PageWhere): Narrowed {
  const held: Record<string, Test> = {}
  for (const condition of where) {
    const lowered = loweredFrom(condition)
    if ("refused" in lowered) continue
    const already = held[lowered.key]
    if (already === undefined) {
      held[lowered.key] = lowered.test
      continue
    }
    const name = Object.keys(lowered.test)[0] as string
    if (name in already) {
      return {
        refused: `\`${lowered.key}\` is tested by \`${name}\` twice, and one key carries one test of each name`,
      }
    }
    held[lowered.key] = { ...already, ...lowered.test }
  }
  return { where: held }
}

async function rowsMatching(
  op: string,
  pageTypeSlug: string,
  where: PageWhere,
  deps: FileWriteDeps
): Promise<readonly Row[]> {
  const narrowed = narrowedFrom(where)
  if ("refused" in narrowed) {
    throw new FileWriteError(
      pageTypeSlug,
      `${op}(${pageTypeSlug}): this write is narrowed by ${narrowed.refused}. Nothing has been written, because a narrow this cannot carry would otherwise reach pages the caller did not name. Narrow the write by a key the page type declares, tested by one value, a list of values, an ordering, or emptiness.`
    )
  }
  const asked = await deps.ask({ pageTypeSlug, where: narrowed.where })
  if ("refused" in asked) {
    throw new FileWriteError(
      pageTypeSlug,
      `${op}(${pageTypeSlug}): the pages this write would reach went unread — ${asked.refused}. Nothing has been written.`
    )
  }
  return asked.rows
}

export function slugsOf(op: string, pageTypeSlug: string, rows: readonly Row[]): readonly string[] {
  const slugs: string[] = []
  for (const row of rows) {
    const slug = row[SLUG]
    if (typeof slug !== "string" || slug === "") {
      throw new FileWriteError(
        pageTypeSlug,
        `${op}(${pageTypeSlug}): a page this write would reach names no \`slug\`, and ${NO_WRITE_PATH} Nothing has been written.`
      )
    }
    slugs.push(slug)
  }
  return slugs
}

function refuseTooMany(
  op: string,
  pageTypeSlug: string,
  slugs: readonly string[],
  ending: string
): never {
  throw new FileWriteError(
    pageTypeSlug,
    `${op}(${pageTypeSlug}): this write names at most one page and ${slugs.length} match — ${slugs.join(", ")}. ${ending}`
  )
}

type Naming = {
  readonly pageTypeSlug: string
  readonly slug: string
  readonly values: Record<string, unknown>
  readonly merge?: boolean
}

async function landed(
  op: string,
  pageTypeSlug: string,
  writer: string | undefined,
  pages: readonly Naming[],
  deps: FileWriteDeps
): Promise<undefined> {
  if (pages.length === 0) return
  const wrote = await deps.write({
    writer: writerLine(writer),
    message: `${op}(${pageTypeSlug}): ${pages.map((one) => one.slug).join(", ")}`,
    pages,
  })
  if ("refused" in wrote) {
    throw new FileWriteError(
      pageTypeSlug,
      `${op}(${pageTypeSlug}): ${wrote.refused}. Nothing has been written.`
    )
  }
}

async function readBack(
  op: string,
  pageTypeSlug: string,
  slugs: readonly string[],
  deps: FileWriteDeps
): Promise<readonly Page[]> {
  if (slugs.length === 0) return []
  const first = slugs[0] as string
  const asked = await deps.ask({
    pageTypeSlug,
    where: { [SLUG]: slugs.length === 1 ? { is: first } : { in: [...slugs] } },
  })
  if ("refused" in asked) {
    throw new FileWriteError(
      pageTypeSlug,
      `${op}(${pageTypeSlug}): the write landed and reading it back was refused — ${asked.refused}.`
    )
  }
  return asked.rows.map((row) => asPage({ ...row, pageTypeSlug }))
}

function valuesFor(input: Readonly<Record<string, unknown>>): Record<string, unknown> {
  const out: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(input)) {
    if (value === undefined) continue
    out[key] = value
  }
  return out
}

export function slugInWhere(where: PageWhere | undefined): string | null {
  for (const one of where ?? []) {
    if ("eq" in one && one.key === SLUG && typeof one.eq === "string" && one.eq !== "")
      return one.eq
  }
  return null
}

// A NEW PAGE IS ADDRESSED BY ITS SLUG. `composedFor` places a page from the index and from the
// folder its type is declared in, so a create owes a slug rather than a path.
export function slugForNew(
  op: string,
  pageTypeSlug: string,
  stated: string | undefined,
  properties: Readonly<Record<string, unknown>>,
  where?: PageWhere
): string {
  if (stated !== undefined && stated.trim() !== "") return stated.trim()
  const said = properties[SLUG]
  if (typeof said === "string" && said.trim() !== "") return said.trim()
  const asked = slugInWhere(where)
  if (asked !== null) return asked
  throw new FileWriteError(
    pageTypeSlug,
    `${op}(${pageTypeSlug}): a page is written by its slug, and this write states none. ${NO_WRITE_PATH} State a \`slug\` among the values, or hand the write a \`name\`.`
  )
}

export type CreateFilePageArgs = {
  readonly pageTypeSlug: string
  readonly properties: Readonly<Record<string, unknown>>
  readonly select?: PageSelect
  readonly id?: string
  readonly name?: string
  readonly writer?: string
}

export async function createFilePage(
  args: CreateFilePageArgs,
  op = "createPage",
  deps: FileWriteDeps = LIVE
): Promise<Page> {
  const slug = slugForNew(op, args.pageTypeSlug, args.name, args.properties)
  const values = valuesFor(args.properties)
  values[SLUG] = slug
  if (args.id !== undefined && args.id !== "") values[ID] = args.id
  await landed(
    op,
    args.pageTypeSlug,
    args.writer,
    [{ pageTypeSlug: args.pageTypeSlug, slug, values }],
    deps
  )
  const back = await readBack(op, args.pageTypeSlug, [slug], deps)
  const one = back[0]
  if (one === undefined) {
    throw new FileWriteError(
      args.pageTypeSlug,
      `${op}(${args.pageTypeSlug}): the write landed and \`${slug}\` did not come back, so what is there went unread.`
    )
  }
  return one
}

export type PatchFilePagesArgs = {
  readonly pageTypeSlug: string
  readonly where: PageWhere
  readonly set: Readonly<Record<string, unknown>>
  readonly select?: PageSelect
  readonly writer?: string
  readonly atMostOne?: boolean
}

export async function patchFilePages(
  args: PatchFilePagesArgs,
  op = "patchPage",
  deps: FileWriteDeps = LIVE
): Promise<readonly Page[]> {
  const rows = await rowsMatching(op, args.pageTypeSlug, args.where, deps)
  const slugs = slugsOf(op, args.pageTypeSlug, rows)
  if (slugs.length === 0) return []
  if (args.atMostOne === true && slugs.length > 1) {
    refuseTooMany(op, args.pageTypeSlug, slugs, "Nothing has been written.")
  }
  const values = valuesFor(args.set)
  await landed(
    op,
    args.pageTypeSlug,
    args.writer,
    slugs.map((slug) => ({ pageTypeSlug: args.pageTypeSlug, slug, values, merge: true })),
    deps
  )
  return readBack(op, args.pageTypeSlug, slugs, deps)
}

export type RemoveFilePagesArgs = {
  readonly pageTypeSlug: string
  readonly where: PageWhere
  readonly select?: PageSelect
  readonly writer?: string
  readonly atMostOne?: boolean
}

export async function removeFilePages(
  args: RemoveFilePagesArgs,
  op = "deletePages",
  deps: FileWriteDeps = LIVE
): Promise<readonly Page[]> {
  const rows = await rowsMatching(op, args.pageTypeSlug, args.where, deps)
  const slugs = slugsOf(op, args.pageTypeSlug, rows)
  if (slugs.length === 0) return []
  if (args.atMostOne === true && slugs.length > 1) {
    refuseTooMany(op, args.pageTypeSlug, slugs, "Nothing has been taken away.")
  }
  const gone = rows.map((row) => asPage({ ...row, pageTypeSlug: args.pageTypeSlug }))
  const found = await deps.read({
    pages: slugs.map((slug) => ({ pageTypeSlug: args.pageTypeSlug, slug })),
  })
  if ("refused" in found) {
    throw new FileWriteError(
      args.pageTypeSlug,
      `${op}(${args.pageTypeSlug}): where these pages are went unread — ${found.refused}. Nothing has been taken away.`
    )
  }
  if (found.unplaced.length > 0) {
    throw new FileWriteError(
      args.pageTypeSlug,
      `${op}(${args.pageTypeSlug}): \`${found.unplaced.join("`, `")}\` is listed and is at no path, so what would be taken away is unknown. Nothing has been taken away.`
    )
  }
  const wrote = await deps.write({
    writer: writerLine(args.writer),
    message: `${op}(${args.pageTypeSlug}): ${slugs.join(", ")}`,
    removes: found.bodies.map((one) => one.path),
  })
  if ("refused" in wrote) {
    throw new FileWriteError(
      args.pageTypeSlug,
      `${op}(${args.pageTypeSlug}): ${wrote.refused}. Nothing has been taken away.`
    )
  }
  return gone
}

export type UpsertFilePageArgs = {
  readonly pageTypeSlug: string
  readonly where: PageWhere
  readonly set: Readonly<Record<string, unknown>>
  readonly select?: PageSelect
  readonly name?: string
  readonly writer?: string
}

export type UpsertedFilePage = {
  readonly page: Page
  readonly created: boolean
}

export async function upsertFilePage(
  args: UpsertFilePageArgs,
  op = "upsertPage",
  deps: FileWriteDeps = LIVE
): Promise<UpsertedFilePage> {
  const rows = await rowsMatching(op, args.pageTypeSlug, args.where, deps)
  const slugs = slugsOf(op, args.pageTypeSlug, rows)
  if (slugs.length > 1) {
    refuseTooMany(op, args.pageTypeSlug, slugs, "Nothing has been written.")
  }
  const standing = slugs[0]
  if (standing === undefined) {
    const named = args.name ?? slugInWhere(args.where) ?? undefined
    const page = await createFilePage(
      {
        pageTypeSlug: args.pageTypeSlug,
        properties: args.set,
        select: args.select,
        ...(named === undefined ? {} : { name: named }),
        ...(args.writer === undefined ? {} : { writer: args.writer }),
      },
      op,
      deps
    )
    return { page, created: true }
  }
  const patched = await patchFilePages(
    {
      pageTypeSlug: args.pageTypeSlug,
      where: [{ key: SLUG, eq: standing }],
      set: args.set,
      select: args.select,
      ...(args.writer === undefined ? {} : { writer: args.writer }),
      atMostOne: true,
    },
    op,
    deps
  )
  const one = patched[0]
  if (one === undefined) {
    throw new FileWriteError(
      args.pageTypeSlug,
      `${op}(${args.pageTypeSlug}): \`${standing}\` was listed and did not come back from the write, so what is there went unread.`
    )
  }
  return { page: one, created: false }
}
