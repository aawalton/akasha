import {
  patchPage as patchOverService,
  removePage as removeOverService,
  type Written,
  writePage as writeOverService,
} from "@shared/pages-query"
import { askComposed } from "@shared/pages-query/ask"
import { z } from "zod"
import { NAMED_FOR_DEFAULT, nameForNew, nameFromAt, refuseTakenName } from "./file-name"
import { askableNarrows, matches, narrowing } from "./file-narrow"
import { type FileReadShape, getFilePage } from "./file-read"
import { buildRawPageRows, mintedId } from "./file-rows"
import { fileShapeOf } from "./file-shape"
import { filedUnder } from "./file-write-backing"
import { FileWriteError } from "./file-write-error"
import { statedId, valuesToWrite } from "./file-write-values"
import { applySelect, flattenRow } from "./routing-core"
import type { PageSelect } from "./types"
import type { Page, PageWhere } from "@shared/pages-core/page-types"


const DEFAULT_WRITER = "pages-access"

const SUBAGENT_MARK = "--"

const ENV_TEXT = z.string().optional()

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

function landed(op: string, pageTypeSlug: string, name: string, written: Written): undefined {
  if (written.ok) return
  throw new FileWriteError(
    pageTypeSlug,
    `${op}(${pageTypeSlug}): the write of \`${name}\` did not land — ${written.why}`
  )
}

const SYNTHETIC_KEYS: ReadonlyMap<string, string> = new Map([
  ["seq", "a page whose file states no seq reads back as none at all rather than as a number"],
  [
    "userId",
    "a file page carries no owner of its own, because a file belongs to the repo rather than to one person",
  ],
])

const OWNER_NARROW = "userId"

function refuseSyntheticNarrow(
  op: string,
  pageTypeSlug: string,
  where: PageWhere,
  ownerSlug: string | null
): undefined {
  for (const condition of where) {
    if ("or" in condition) {
      refuseSyntheticNarrow(op, pageTypeSlug, condition.or, ownerSlug)
      continue
    }
    if (condition.key === OWNER_NARROW && ownerSlug !== null) continue
    const why = SYNTHETIC_KEYS.get(condition.key)
    if (why === undefined) continue
    throw new FileWriteError(
      pageTypeSlug,
      `${op}(${pageTypeSlug}): this where narrows by \`${condition.key}\`, and ${why}. Such a narrow matches every page or none rather than the one meant. Address the page by \`id\` or \`slug\`.`
    )
  }
}

function refuseDroppedNarrow(
  op: string,
  pageTypeSlug: string,
  dropped: readonly string[]
): undefined {
  if (dropped.length === 0) return
  throw new FileWriteError(
    pageTypeSlug,
    `${op}(${pageTypeSlug}): this page type states no \`owner-slug\`, so the narrow on \`${dropped.join("`, `")}\` cannot be asked of a file and was dropped. A write located by fewer conditions than it was given reaches every page rather than the ones meant, so nothing has been written. Address the page by \`id\` or \`slug\`, or declare \`owner-slug\` on the page type.`
  )
}

type Located = {
  readonly page: Page
  readonly name: string
}

async function shapeFor(op: string, pageTypeSlug: string): Promise<FileReadShape> {
  const shape = await fileShapeOf(pageTypeSlug)
  if (shape === null) {
    throw new FileWriteError(
      pageTypeSlug,
      `${op}(${pageTypeSlug}): nothing states this page type's shape, so a write cannot say what its properties are. Give the \`${pageTypeSlug}\` page type an \`id:\`.`
    )
  }
  return shape
}

async function locate(
  op: string,
  pageTypeSlug: string,
  glob: string,
  where: PageWhere | undefined
): Promise<readonly Located[]> {
  const shape = await shapeFor(op, pageTypeSlug)
  const owner = shape.ownerSlug ?? null
  refuseSyntheticNarrow(op, pageTypeSlug, where ?? [], owner)
  const askable = askableNarrows(where, owner)
  refuseDroppedNarrow(op, pageTypeSlug, askable.dropped)
  const narrowed = askable.where ?? []
  const tests = narrowing(askable.where, shape.definitions)
  const asked = await askComposed({
    "page-type": pageTypeSlug,
    ...(tests === null ? {} : { where: tests }),
  })
  if (!asked.ok) {
    throw new FileWriteError(
      pageTypeSlug,
      `${op}(${pageTypeSlug}): the pages this write would match went unread — ${asked.why}`
    )
  }
  const rows = asked.answer.rows
  const built = buildRawPageRows({
    rows,
    definitions: shape.definitions,
    pageTypeId: shape.pageTypeId,
    pageTypeSlug,
  })
  const found: Located[] = []
  built.forEach((raw, index) => {
    const page = flattenRow({ ...raw })
    if (!narrowed.every((condition) => matches(page, condition, shape.definitions))) return
    const at = rows[index]?.at
    if (at === undefined) {
      throw new FileWriteError(
        pageTypeSlug,
        `${op}(${pageTypeSlug}): a matching page reports no file it stands in, so nothing here can name what to write.`
      )
    }
    const name = nameFromAt(glob, at)
    if (name === null) {
      throw new FileWriteError(
        pageTypeSlug,
        `${op}(${pageTypeSlug}): the page at \`${at}\` does not sit where \`${glob}\` puts one, so a write addressed by name would land somewhere else.`
      )
    }
    found.push({ page, name })
  })
  return found
}

function refuseMany(op: string, pageTypeSlug: string, found: readonly Located[]): undefined {
  if (found.length <= 1) return
  throw new FileWriteError(
    pageTypeSlug,
    `${op}(${pageTypeSlug}): this where matches ${found.length} pages — ${found.map((one) => one.name).join(", ")}. One file is one page, so there is no single page for this write to be. Nothing has been written. Address the page by \`id\` or \`slug\`, or call the plural verb where every match is meant.`
  )
}

async function readBack(
  op: string,
  pageTypeSlug: string,
  id: string,
  select: PageSelect | undefined
): Promise<Page> {
  const shape = await shapeFor(op, pageTypeSlug)
  const page = await getFilePage({
    pageTypeSlug,
    shape,
    where: [{ key: "id", eq: id }],
    select,
  })
  if (page === null) {
    throw new FileWriteError(
      pageTypeSlug,
      `${op}(${pageTypeSlug}): the write reported that it landed, and reading page \`${id}\` back found nothing. The file and what reads it disagree, so do not treat this write as done.`
    )
  }
  return page
}

function idOf(op: string, pageTypeSlug: string, page: Page, name: string): string {
  const id = page.id
  if (typeof id === "string" && id !== "") return id
  throw new FileWriteError(
    pageTypeSlug,
    `${op}(${pageTypeSlug}): \`${name}\` carries no id, so the write cannot be read back and confirmed.`
  )
}

export function refuseJsonPatch(op: string, pageTypeSlug: string, patch: unknown): undefined {
  if (patch === undefined) return
  throw new FileWriteError(
    pageTypeSlug,
    `${op}(${pageTypeSlug}): this page type's pages are files, and a JSON patch addresses a path inside a row's attributes, which a file has no equivalent of. Set the whole property instead.`
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

export async function createFilePage(args: CreateFilePageArgs, op = "createPage"): Promise<Page> {
  const backed = await filedUnder(op, args.pageTypeSlug)
  const values = await valuesToWrite(op, args.pageTypeSlug, args.properties)
  const id = args.id ?? statedId(values) ?? mintedId()
  const naming = nameForNew(
    op,
    args.pageTypeSlug,
    args.name,
    { ...values, id },
    undefined,
    backed.namedFor
  )
  const standing = await locate(op, args.pageTypeSlug, backed.glob, undefined)
  const name = naming.stated ? naming.name : naming.stem
  const already = standing.find((one) => one.name === name)
  if (already !== undefined) {
    const held = `\`${String(already.page.title ?? already.page.slug ?? name)}\`, id ${String(already.page.id)}`
    if (!naming.stated) {
      refuseTakenName(op, args.pageTypeSlug, backed.namedFor ?? NAMED_FOR_DEFAULT, name, held)
    }
    throw new FileWriteError(
      args.pageTypeSlug,
      `${op}(${args.pageTypeSlug}): a page already stands at \`${name}\` — ${held}. A write here replaces the whole file, so a create would take away every value it does not state and mint a second id for one page. Patch it, or create it under another name.`
    )
  }
  landed(
    op,
    args.pageTypeSlug,
    name,
    await writeOverService(args.pageTypeSlug, name, { ...values, id }, writerOf(args.writer))
  )
  return readBack(op, args.pageTypeSlug, id, args.select)
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
  op = "patchPage"
): Promise<readonly Page[]> {
  const backed = await filedUnder(op, args.pageTypeSlug)
  const found = await locate(op, args.pageTypeSlug, backed.glob, args.where)
  if (args.atMostOne === true) refuseMany(op, args.pageTypeSlug, found)
  if (found.length === 0) return []
  const values = await valuesToWrite(op, args.pageTypeSlug, args.set)
  const writer = writerOf(args.writer)
  const patched: Page[] = []
  for (const one of found) {
    const id = idOf(op, args.pageTypeSlug, one.page, one.name)
    landed(
      op,
      args.pageTypeSlug,
      one.name,
      await patchOverService(args.pageTypeSlug, one.name, values, writer)
    )
    patched.push(await readBack(op, args.pageTypeSlug, id, args.select))
  }
  return patched
}

export function refuseUndelete(op: string, pageTypeSlug: string): undefined {
  throw new FileWriteError(
    pageTypeSlug,
    `${op}(${pageTypeSlug}): this page type's pages are files, and a removal takes the file away rather than raising a flag on it, so there is nothing here to undelete. Bring it back with \`git revert\`, which carries the whole page rather than a column.`
  )
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
  op = "softDeletePages"
): Promise<readonly Page[]> {
  const backed = await filedUnder(op, args.pageTypeSlug)
  const found = await locate(op, args.pageTypeSlug, backed.glob, args.where)
  if (args.atMostOne === true) refuseMany(op, args.pageTypeSlug, found)
  if (found.length === 0) return []
  const writer = writerOf(args.writer)
  const gone: Page[] = []
  for (const one of found) {
    landed(
      op,
      args.pageTypeSlug,
      one.name,
      await removeOverService(args.pageTypeSlug, one.name, writer)
    )
    gone.push(applySelect(one.page, args.select))
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
  op = "upsertPage"
): Promise<UpsertedFilePage> {
  const backed = await filedUnder(op, args.pageTypeSlug)
  const found = await locate(op, args.pageTypeSlug, backed.glob, args.where)
  refuseMany(op, args.pageTypeSlug, found)
  const values = await valuesToWrite(op, args.pageTypeSlug, args.set)
  const one = found[0]
  if (one !== undefined) {
    const id = idOf(op, args.pageTypeSlug, one.page, one.name)
    landed(
      op,
      args.pageTypeSlug,
      one.name,
      await patchOverService(args.pageTypeSlug, one.name, values, writerOf(args.writer))
    )
    return { page: await readBack(op, args.pageTypeSlug, id, args.select), created: false }
  }
  const id = statedId(values) ?? mintedId()
  const naming = nameForNew(
    op,
    args.pageTypeSlug,
    args.name,
    { ...values, id },
    args.where,
    backed.namedFor
  )
  const page = await createFilePage(
    {
      pageTypeSlug: args.pageTypeSlug,
      properties:
        naming.stated && values.slug === undefined ? { ...args.set, slug: naming.name } : args.set,
      select: args.select,
      id,
      ...(naming.stated ? { name: naming.name } : {}),
      writer: args.writer,
    },
    op
  )
  return { page, created: true }
}
