import { asPage, type Page, type PageWhere } from "@akasha/pages-core/page-types"
import { removeFilePages } from "../file-write/file-write.module.code.ts"
import { rejectDefinitionTier, requireFileBacked } from "../guards/guards.module.code.ts"
import { asPageList, overServer, writesOverServer } from "../over-server/over-server.module.code.ts"
import type { PageSelect } from "../types/types.module.code.ts"

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

async function runBulk(args: DeletePageArgs, atMostOne = false): Promise<readonly Page[]> {
  const named = atMostOne ? "deletePage" : "deletePages"
  rejectDefinitionTier(args.pageTypeSlug, named)
  await requireFileBacked(named, args.pageTypeSlug)
  if (writesOverServer()) {
    if (atMostOne) {
      const one = await overServer("deletePage", args)
      return one === null ? [] : [asPage(one)]
    }
    return asPageList(await overServer("deletePages", args))
  }
  return removeFilePages(
    { pageTypeSlug: args.pageTypeSlug, where: args.where, select: args.select, atMostOne },
    named
  )
}

export async function deletePage(args: DeletePageArgs): Promise<Page | null> {
  const gone = await runBulk(args, true)
  if (gone.length > 1) {
    throw new Error(
      `deletePage(${args.pageTypeSlug}): expected at most one match, got ${gone.length}`
    )
  }
  return gone[0] ?? null
}

export function deletePages(args: DeletePageArgs): Promise<readonly Page[]> {
  return runBulk(args)
}

export async function deletePageById(args: DeletePageByIdArgs): Promise<Page | null> {
  const named = "deletePageById"
  rejectDefinitionTier(args.pageTypeSlug, named)
  await requireFileBacked(named, args.pageTypeSlug)
  if (writesOverServer()) {
    const one = await overServer(named, args)
    return one === null ? null : asPage(one)
  }
  const gone = await removeFilePages(
    {
      pageTypeSlug: args.pageTypeSlug,
      where: [{ key: "id", eq: args.id }],
      select: args.select,
      atMostOne: true,
    },
    named
  )
  return gone[0] ?? null
}

export async function deletePageByIds(args: DeletePageByIdsArgs): Promise<readonly Page[]> {
  const named = "deletePageByIds"
  rejectDefinitionTier(args.pageTypeSlug, named)
  await requireFileBacked(named, args.pageTypeSlug)
  if (writesOverServer()) return asPageList(await overServer(named, args))
  return removeFilePages(
    {
      pageTypeSlug: args.pageTypeSlug,
      where: [{ key: "id", in: [...args.ids] }],
      select: args.select,
    },
    named
  )
}
