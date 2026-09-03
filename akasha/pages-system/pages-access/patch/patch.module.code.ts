import { asPage, type Page, type PageWhere } from "@akasha/pages-core/page-types"
import type { Json } from "@akasha/utils-narrow/json-value"
import { patchFilePages, refuseJsonPatch } from "../file-write/file-write.module.code.ts"
import {
  enforcePipelineScope,
  rejectDefinitionTier,
  rejectReadOnlyKeys,
  rejectWholesaleTagsSet,
  requireFileBacked,
} from "../guards/guards.module.code.ts"
import { asPageList, overServer, writesOverServer } from "../over-server/over-server.module.code.ts"
import type { JsonPatch, PagePropertiesInput, PageSelect } from "../types/types.module.code.ts"

const LAST_VIEWED_AT_KEY = "lastViewedAt"

export type PatchPageArgs<T extends Record<string, unknown> = Record<string, Json>> = {
  pageTypeSlug: string
  where: PageWhere
  set: PagePropertiesInput<T>
  patch?: JsonPatch
  select?: PageSelect
  pipelineScope?: number | string
}

async function callPagePatch<T extends Record<string, unknown> = Record<string, Json>>(
  args: PatchPageArgs<T>,
  atMostOne = false
): Promise<readonly Page[]> {
  rejectDefinitionTier(args.pageTypeSlug, "patchPage")
  rejectReadOnlyKeys("patchPage", args.set)
  rejectWholesaleTagsSet("patchPage", args.set)
  enforcePipelineScope("patchPage", args.pipelineScope, {
    pageTypeSlug: args.pageTypeSlug,
    ...args.set,
  })
  await requireFileBacked("patchPage", args.pageTypeSlug)
  refuseJsonPatch("patchPage", args.pageTypeSlug, args.patch)
  if (writesOverServer()) {
    if (atMostOne) {
      const one = await overServer("patchPage", args)
      return one === null ? [] : [asPage(one)]
    }
    return asPageList(await overServer("patchPages", args))
  }
  return patchFilePages({
    pageTypeSlug: args.pageTypeSlug,
    where: args.where,
    set: args.set,
    select: args.select,
    atMostOne,
  })
}

export async function patchPage<T extends Record<string, unknown> = Record<string, Json>>(
  args: PatchPageArgs<T>
): Promise<Page | null> {
  const rows = await callPagePatch(args, true)
  if (rows.length === 0) return null
  if (rows.length > 1) {
    throw new Error(
      `patchPage(${args.pageTypeSlug}): expected at most one match, got ${rows.length}`
    )
  }
  return rows[0] ?? null
}

export async function patchPages<T extends Record<string, unknown> = Record<string, Json>>(
  args: PatchPageArgs<T>
): Promise<readonly Page[]> {
  return callPagePatch(args)
}

export type PatchPageByIdArgs<T extends Record<string, unknown> = Record<string, Json>> = {
  pageTypeSlug: string
  id: string
  set: PagePropertiesInput<T>
  patch?: JsonPatch
  select?: PageSelect
  pipelineScope?: number | string
}

export async function patchPageById<T extends Record<string, unknown> = Record<string, Json>>(
  args: PatchPageByIdArgs<T>
): Promise<Page | null> {
  rejectDefinitionTier(args.pageTypeSlug, "patchPageById")
  rejectReadOnlyKeys("patchPageById", args.set)
  rejectWholesaleTagsSet("patchPageById", args.set)
  enforcePipelineScope("patchPageById", args.pipelineScope, {
    pageTypeSlug: args.pageTypeSlug,
    ...args.set,
  })
  await requireFileBacked("patchPageById", args.pageTypeSlug)
  refuseJsonPatch("patchPageById", args.pageTypeSlug, args.patch)
  if (writesOverServer()) {
    const one = await overServer("patchPageById", args)
    return one === null ? null : asPage(one)
  }
  const patched = await patchFilePages(
    {
      pageTypeSlug: args.pageTypeSlug,
      where: [{ key: "id", eq: args.id }],
      set: args.set,
      select: args.select,
      atMostOne: true,
    },
    "patchPageById"
  )
  return patched[0] ?? null
}

export async function recordPageView(args: {
  pageTypeSlug: string
  id: string
}): Promise<Page | null> {
  return patchPageById({
    pageTypeSlug: args.pageTypeSlug,
    id: args.id,
    set: { [LAST_VIEWED_AT_KEY]: Date.now() },
  })
}
