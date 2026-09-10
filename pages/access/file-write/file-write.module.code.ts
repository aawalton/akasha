import { asPage, type Page, type PageWhere } from "@akasha/pages/core/page-types"
import type { Asked, Query, Row } from "@akasha/pages/service/asking"
import { askingFor, readingFor, type Writing, writingFor } from "@akasha/pages/service/calling"
import type { Read, Asked as Sought } from "@akasha/pages/service/reading"
import type { Wrote } from "@akasha/pages/service/writing"
import { z } from "zod"
import { FileWriteError } from "../file-write-error/file-write-error.module.code.ts"
import { narrowedFrom } from "../file-write-narrow/file-write-narrow.module.code.ts"
import type { PageSelect } from "../types/types.module.code.ts"

const DEFAULT_WRITER = "pages-access"

const SUBAGENT_MARK = "--"

const ENV_TEXT = z.string().optional()

const WRITER_HOST = "alanwalton.com"

const SLUG = "slug"

const ID = "id"

const NO_WRITE_PATH =
  "`@akasha/pages-service` writes a page by its page type, its slug and its values, and places the page from the index rather than from a name a caller works out."

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

type Naming = NonNullable<Writing["pages"]>[number]

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
  readonly bodies?: Readonly<Record<string, string>>
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
    [
      {
        pageTypeSlug: args.pageTypeSlug,
        slug,
        values,
        ...(args.bodies === undefined ? {} : { bodies: args.bodies }),
      },
    ],
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
  readonly bodies?: Readonly<Record<string, string>>
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
    slugs.map((slug) => ({
      pageTypeSlug: args.pageTypeSlug,
      slug,
      values,
      merge: true,
      ...(args.bodies === undefined ? {} : { bodies: args.bodies }),
    })),
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
  readonly bodies?: Readonly<Record<string, string>>
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
        ...(args.bodies === undefined ? {} : { bodies: args.bodies }),
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
      ...(args.bodies === undefined ? {} : { bodies: args.bodies }),
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
