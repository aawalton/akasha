import type { Page, PageWhere } from "@akasha/pages-core/page-types"
import { z } from "zod"
import { FileWriteError } from "../file-write-error/file-write-error.module.code.ts"
import type { PageSelect } from "../types/types.module.code.ts"

const DEFAULT_WRITER = "pages-access"

const SUBAGENT_MARK = "--"

const ENV_TEXT = z.string().optional()

const NO_NAME_TO_WRITE =
  "a write here located its page by asking for every row a `where` matched, taking the file path each row reported, and measuring that path against the glob its page type was filed under to get a name. `@akasha/pages-system-service` reports no path for a row and there is no glob left to measure one against, so a `where` names no file."

const NO_WRITE_PATH =
  "`@akasha/pages-system-service` writes a page by its page type, its slug and its values, and places the page from the index rather than from a name a caller works out."

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

export function refuseJsonPatch(op: string, pageTypeSlug: string, patch: unknown): undefined {
  if (patch === undefined) return
  throw new FileWriteError(
    pageTypeSlug,
    `${op}(${pageTypeSlug}): this page type's pages are files, and a JSON patch addresses a path inside a row's attributes, which a file has no equivalent of. Set the whole property instead.`
  )
}

function refuse(op: string, pageTypeSlug: string): never {
  throw new FileWriteError(
    pageTypeSlug,
    `${op}(${pageTypeSlug}): ${NO_NAME_TO_WRITE} Nothing has been written. ${NO_WRITE_PATH} Address the page by its slug and write it through \`@akasha/pages-system-service\`.`
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
  return refuse(op, args.pageTypeSlug)
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
  return refuse(op, args.pageTypeSlug)
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
  op = "deletePages"
): Promise<readonly Page[]> {
  return refuse(op, args.pageTypeSlug)
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
  return refuse(op, args.pageTypeSlug)
}
