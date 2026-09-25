import { isJson } from "akasha/code/type/narrowing/modules/is-json/is-json.module.code.ts"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import type { Json } from "akasha/code/type/narrowing/modules/json-value/json-value.module.code.ts"
import { upsertFilePage } from "akasha/page/access/modules/file-write/file-write.module.code.ts"
import { upsertFilePages } from "akasha/page/access/modules/file-write-many/file-write-many.module.code.ts"
import {
  asPageList,
  overServer,
  writesOverServer,
} from "akasha/page/access/modules/over-server/over-server.module.code.ts"
import type {
  PagePropertiesInput,
  PageSelect,
} from "akasha/page/access/modules/types/types.module.code.ts"
import {
  asPage,
  type Page,
  type PageWhere,
} from "akasha/page/core/modules/page-types/page-types.module.code.ts"

export type UpsertPageArgs<T extends Record<string, unknown> = Record<string, Json>> = {
  pageTypeSlug: string
  where: PageWhere
  set: PagePropertiesInput<T>
  bodies?: Readonly<Record<string, string>>
  select?: PageSelect
  writer?: string
}

export type UpsertPagesArgs<T extends Record<string, unknown> = Record<string, Json>> = {
  pageTypeSlug: string
  items: ReadonlyArray<{
    where: PageWhere
    set: PagePropertiesInput<T>
    clears?: readonly string[] | undefined
  }>
  select?: PageSelect
}

type BulkUpsertPagesArgs<T extends Record<string, unknown> = Record<string, Json>> = {
  pageTypeSlug: string
  uniqueAttributeKey: string
  items: ReadonlyArray<PagePropertiesInput<T>>
  select?: PageSelect
}

export async function upsertPage<T extends Record<string, unknown> = Record<string, Json>>(
  args: UpsertPageArgs<T>
): Promise<Page> {
  if (writesOverServer()) return asPage(await overServer("upsertPage", args))
  const { page } = await upsertFilePage({
    pageTypeSlug: args.pageTypeSlug,
    where: args.where,
    set: args.set,
    select: args.select,
    writer: args.writer,
    ...(args.bodies === undefined ? {} : { bodies: args.bodies }),
  })
  return page
}

export async function upsertPages<T extends Record<string, unknown> = Record<string, Json>>(
  args: UpsertPagesArgs<T>
): Promise<readonly Page[]> {
  if (writesOverServer()) return asPageList(await overServer("upsertPages", args))
  return await upsertFilePages({
    pageTypeSlug: args.pageTypeSlug,
    items: args.items.map((item) => ({
      where: item.where,
      set: item.set,
      ...(item.clears === undefined ? {} : { clears: item.clears }),
    })),
    ...(args.select === undefined ? {} : { select: args.select }),
  })
}

export async function bulkUpsertPages<T extends Record<string, unknown> = Record<string, Json>>(
  args: BulkUpsertPagesArgs<T>
): Promise<readonly Page[]> {
  if (writesOverServer()) return asPageList(await overServer("bulkUpsertPages", args))
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
