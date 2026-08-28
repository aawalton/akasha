import type { Json } from "../../supabase-database/src/generated/database"
import { isJson } from "../../utils-narrow/src/is-json"
import { isRecord } from "../../utils-narrow/src/is-record"
import { upsertFilePage } from "./file-write"
import {
  enforcePipelineScope,
  rejectDefinitionTier,
  rejectReadOnlyKeys,
  requireFileBacked,
} from "./guards"
import { overServer, writesOverServer } from "./over-server"
import { type PagePropertiesInput, type PageSelect } from "./types"
import { Page, type PageWhere } from "@shared/pages-core/page-types"

export type UpsertPageArgs<T extends Record<string, unknown> = Record<string, Json>> = {
  pageTypeSlug: string
  where: PageWhere
  set: PagePropertiesInput<T>
  select?: PageSelect
  pipelineScope?: number | string
  writer?: string
}

export type UpsertPagesArgs<T extends Record<string, unknown> = Record<string, Json>> = {
  pageTypeSlug: string
  items: ReadonlyArray<{ where: PageWhere; set: PagePropertiesInput<T> }>
  select?: PageSelect
  pipelineScope?: number | string
}

export type BulkUpsertPagesArgs<T extends Record<string, unknown> = Record<string, Json>> = {
  pageTypeSlug: string
  uniqueAttributeKey: string
  items: ReadonlyArray<PagePropertiesInput<T>>
  select?: PageSelect
  pipelineScope?: number | string
}

function asPage(value: unknown): Page {
  return Page(value)
}

function asPageList(value: unknown): readonly Page[] {
  if (!Array.isArray(value)) return []
  return value.map((row) => Page(row))
}

export async function upsertPage<T extends Record<string, unknown> = Record<string, Json>>(
  args: UpsertPageArgs<T>
): Promise<Page> {
  rejectDefinitionTier(args.pageTypeSlug, "upsertPage")
  rejectReadOnlyKeys("upsertPage", args.set)
  enforcePipelineScope("upsertPage", args.pipelineScope, {
    pageTypeSlug: args.pageTypeSlug,
    ...args.set,
  })
  await requireFileBacked("upsertPage", args.pageTypeSlug)
  if (writesOverServer()) return asPage(await overServer("upsertPage", args))
  const { page } = await upsertFilePage({
    pageTypeSlug: args.pageTypeSlug,
    where: args.where,
    set: args.set,
    select: args.select,
    writer: args.writer,
  })
  return page
}

export async function upsertPages<T extends Record<string, unknown> = Record<string, Json>>(
  args: UpsertPagesArgs<T>
): Promise<readonly Page[]> {
  rejectDefinitionTier(args.pageTypeSlug, "upsertPages")
  for (const item of args.items) rejectReadOnlyKeys("upsertPages", item.set)
  for (const item of args.items) {
    enforcePipelineScope("upsertPages", args.pipelineScope, {
      pageTypeSlug: args.pageTypeSlug,
      ...item.set,
    })
  }
  await requireFileBacked("upsertPages", args.pageTypeSlug)
  if (writesOverServer()) return asPageList(await overServer("upsertPages", args))
  const landed: Page[] = []
  for (const item of args.items) {
    const { page } = await upsertFilePage(
      {
        pageTypeSlug: args.pageTypeSlug,
        where: item.where,
        set: item.set,
        select: args.select,
      },
      "upsertPages"
    )
    landed.push(page)
  }
  return landed
}

export async function bulkUpsertPages<T extends Record<string, unknown> = Record<string, Json>>(
  args: BulkUpsertPagesArgs<T>
): Promise<readonly Page[]> {
  rejectDefinitionTier(args.pageTypeSlug, "bulkUpsertPages")
  for (const item of args.items) rejectReadOnlyKeys("bulkUpsertPages", item)
  for (const item of args.items) {
    enforcePipelineScope("bulkUpsertPages", args.pipelineScope, {
      pageTypeSlug: args.pageTypeSlug,
      ...item,
    })
  }
  await requireFileBacked("bulkUpsertPages", args.pageTypeSlug)
  const landed: Page[] = []
  for (const item of args.items) {
    const keyed = isRecord(item) ? item[args.uniqueAttributeKey] : undefined
    if (keyed === undefined || keyed === null) {
      throw new Error(
        `bulkUpsertPages(${args.pageTypeSlug}): an item states no \`${args.uniqueAttributeKey}\`, and a file page is found by what its unique key holds.`
      )
    }
    if (!isJson(keyed)) {
      throw new Error(
        `bulkUpsertPages(${args.pageTypeSlug}): the \`${args.uniqueAttributeKey}\` an item states is not JSON, so nothing here can name the page this write is for.`
      )
    }
    const { page } = await upsertFilePage(
      {
        pageTypeSlug: args.pageTypeSlug,
        where: [{ key: args.uniqueAttributeKey, eq: keyed }],
        set: item,
        select: args.select,
      },
      "bulkUpsertPages"
    )
    landed.push(page)
  }
  return landed
}
