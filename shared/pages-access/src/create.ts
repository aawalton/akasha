import type { Json } from "../../supabase-database/src/generated/database"
import { z } from "zod"
import { createFilePage, upsertFilePage } from "./file-write"
import {
  enforcePipelineScope,
  rejectDefinitionTier,
  rejectReadOnlyKeys,
  requireFileBacked,
} from "./guards"
import { overServer, writesOverServer } from "./over-server"
import { type PagePropertiesInput, type PageSelect } from "./types"
import { Page, type PageWhere } from "@shared/pages-core/page-types"

export type CreatePageArgs<T extends Record<string, unknown> = Record<string, Json>> = {
  pageTypeSlug: string
  properties: PagePropertiesInput<T>
  select?: PageSelect
  pipelineScope?: number | string
  id?: string
}

export async function createPage<T extends Record<string, unknown> = Record<string, Json>>(
  args: CreatePageArgs<T>
): Promise<Page> {
  rejectDefinitionTier(args.pageTypeSlug, "createPage")
  rejectReadOnlyKeys("createPage", args.properties)
  enforcePipelineScope("createPage", args.pipelineScope, {
    pageTypeSlug: args.pageTypeSlug,
    ...args.properties,
  })
  await requireFileBacked("createPage", args.pageTypeSlug)
  if (writesOverServer()) return Page(await overServer("createPage", args))
  return createFilePage({
    pageTypeSlug: args.pageTypeSlug,
    properties: args.properties,
    select: args.select,
    id: args.id,
  })
}

export type CreatePageIfAbsentArgs<T extends Record<string, unknown> = Record<string, Json>> = {
  pageTypeSlug: string
  where: PageWhere
  properties: PagePropertiesInput<T>
  select?: PageSelect
  pipelineScope?: number | string
}

export type CreatePageIfAbsentResult = {
  page: Page
  created: boolean
}

const CREATED_OVER_SERVER = z.looseObject({ page: z.unknown(), created: z.boolean() })

export async function createPageIfAbsent<T extends Record<string, unknown> = Record<string, Json>>(
  args: CreatePageIfAbsentArgs<T>
): Promise<CreatePageIfAbsentResult> {
  rejectDefinitionTier(args.pageTypeSlug, "createPageIfAbsent")
  rejectReadOnlyKeys("createPageIfAbsent", args.properties)
  enforcePipelineScope("createPageIfAbsent", args.pipelineScope, {
    pageTypeSlug: args.pageTypeSlug,
    ...args.properties,
  })
  await requireFileBacked("createPageIfAbsent", args.pageTypeSlug)
  if (writesOverServer()) {
    const over = CREATED_OVER_SERVER.parse(await overServer("createPageIfAbsent", args))
    return { page: Page(over.page), created: over.created }
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
