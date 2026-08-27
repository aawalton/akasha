import type { Json } from "../../supabase-database/src/generated/database"
import { refuseUndelete, removeFilePages } from "./file-write"
import { rejectDefinitionTier, requireFileBacked } from "./guards"
import { overServer, writesOverServer } from "./over-server"
import { type PageSelect } from "./types"
import { Page, type PageWhere } from "@shared/pages-core/page-types"

export type DeletePageArgs = {
  pageTypeSlug: string
  where: PageWhere
  select?: PageSelect
}

export type DeletePageByIdArgs = {
  pageTypeSlug: string
  id: string
  select?: PageSelect
}

export type DeletePageByIdsArgs = {
  pageTypeSlug: string
  ids: readonly string[]
  select?: PageSelect
}

type Mode = "soft" | "undelete" | "hard"

function label(mode: Mode, plural: boolean): string {
  const base = mode === "soft" ? "softDelete" : mode === "undelete" ? "undelete" : "hardDelete"
  return plural ? `${base}Pages` : `${base}Page`
}

function asPageList(value: Json): readonly Page[] {
  if (!Array.isArray(value)) return []
  return value.map((row) => Page(row))
}

function asPage(value: Json): Page {
  return Page(value)
}

async function runBulk(
  args: DeletePageArgs,
  mode: Mode,
  atMostOne = false
): Promise<readonly Page[]> {
  const named = label(mode, !atMostOne)
  rejectDefinitionTier(args.pageTypeSlug, named)
  await requireFileBacked(named, args.pageTypeSlug)
  if (mode === "undelete") refuseUndelete(named, args.pageTypeSlug)
  if (writesOverServer()) {
    if (atMostOne) {
      const one = await overServer(mode === "hard" ? "hardDeletePage" : "softDeletePage", args)
      return one === null ? [] : [asPage(one)]
    }
    const over = await overServer(mode === "hard" ? "hardDeletePages" : "softDeletePages", args)
    return asPageList(over)
  }
  return removeFilePages(
    { pageTypeSlug: args.pageTypeSlug, where: args.where, select: args.select, atMostOne },
    named
  )
}

async function runSingle(args: DeletePageArgs, mode: Mode): Promise<Page | null> {
  const rows = await runBulk(args, mode, true)
  if (rows.length === 0) return null
  if (rows.length > 1) {
    throw new Error(
      `${label(mode, false)}(${args.pageTypeSlug}): expected at most one match, got ${rows.length}`
    )
  }
  return rows[0] ?? null
}

export function softDeletePage(args: DeletePageArgs): Promise<Page | null> {
  return runSingle(args, "soft")
}

export function softDeletePages(args: DeletePageArgs): Promise<readonly Page[]> {
  return runBulk(args, "soft")
}

export function undeletePage(args: DeletePageArgs): Promise<Page | null> {
  return runSingle(args, "undelete")
}

export function undeletePages(args: DeletePageArgs): Promise<readonly Page[]> {
  return runBulk(args, "undelete")
}

export function hardDeletePage(args: DeletePageArgs): Promise<Page | null> {
  return runSingle(args, "hard")
}

export function hardDeletePages(args: DeletePageArgs): Promise<readonly Page[]> {
  return runBulk(args, "hard")
}

async function runById(
  args: DeletePageByIdArgs,
  mode: Mode,
  wrapperName: string
): Promise<Page | null> {
  rejectDefinitionTier(args.pageTypeSlug, wrapperName)
  await requireFileBacked(wrapperName, args.pageTypeSlug)
  if (mode === "undelete") refuseUndelete(wrapperName, args.pageTypeSlug)
  const gone = await removeFilePages(
    {
      pageTypeSlug: args.pageTypeSlug,
      where: [{ key: "id", eq: args.id }],
      select: args.select,
      atMostOne: true,
    },
    wrapperName
  )
  return gone[0] ?? null
}

async function runByIds(args: DeletePageByIdsArgs, wrapperName: string): Promise<readonly Page[]> {
  rejectDefinitionTier(args.pageTypeSlug, wrapperName)
  await requireFileBacked(wrapperName, args.pageTypeSlug)
  return removeFilePages(
    {
      pageTypeSlug: args.pageTypeSlug,
      where: [{ key: "id", in: [...args.ids] }],
      select: args.select,
    },
    wrapperName
  )
}

export function softDeletePageById(args: DeletePageByIdArgs): Promise<Page | null> {
  return runById(args, "soft", "softDeletePageById")
}

export function undeletePageById(args: DeletePageByIdArgs): Promise<Page | null> {
  return runById(args, "undelete", "undeletePageById")
}

export function hardDeletePageById(args: DeletePageByIdArgs): Promise<Page | null> {
  return runById(args, "hard", "hardDeletePageById")
}

export function hardDeletePageByIds(args: DeletePageByIdsArgs): Promise<readonly Page[]> {
  return runByIds(args, "hardDeletePageByIds")
}
