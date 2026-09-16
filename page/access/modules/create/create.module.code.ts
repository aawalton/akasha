import type { Json } from "akasha/code/type/narrowing/modules/json-value/json-value.module.code.ts"
import {
  createFilePage,
  upsertFilePage,
} from "akasha/page/access/modules/file-write/file-write.module.code.ts"
import {
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
import { z } from "zod"

export type CreatePageArgs<T extends Record<string, unknown> = Record<string, Json>> = {
  pageTypeSlug: string
  properties: PagePropertiesInput<T>
  select?: PageSelect
  id?: string
  path?: string
}

export async function createPage<T extends Record<string, unknown> = Record<string, Json>>(
  args: CreatePageArgs<T>
): Promise<Page> {
  if (writesOverServer()) return asPage(await overServer("createPage", args))
  return createFilePage({
    pageTypeSlug: args.pageTypeSlug,
    properties: args.properties,
    select: args.select,
    id: args.id,
    path: args.path,
  })
}

export type CreatePageIfAbsentArgs<T extends Record<string, unknown> = Record<string, Json>> = {
  pageTypeSlug: string
  where: PageWhere
  properties: PagePropertiesInput<T>
  select?: PageSelect
}

export type CreatePageIfAbsentResult = {
  page: Page
  created: boolean
}

const CREATED_OVER_SERVER = z.looseObject({ page: z.unknown(), created: z.boolean() })

export async function createPageIfAbsent<T extends Record<string, unknown> = Record<string, Json>>(
  args: CreatePageIfAbsentArgs<T>
): Promise<CreatePageIfAbsentResult> {
  if (writesOverServer()) {
    const over = CREATED_OVER_SERVER.parse(await overServer("createPageIfAbsent", args))
    return { page: asPage(over.page), created: over.created }
  }
  return upsertFilePage(
    {
      pageTypeSlug: args.pageTypeSlug,
      where: args.where,
      set: args.properties,
      select: args.select,
    },
    "createPageIfAbsent"
  )
}
