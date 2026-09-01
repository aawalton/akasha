import type { Page } from "@akasha/pages-core/page-types"
import type { SequenceConfig } from "@akasha/pages-core/schema/sequence-config"
import type { Json } from "@akasha/utils-narrow/json-value"
import { streamPages } from "../iterate/iterate.module.code.ts"
import { getSequenceConfig } from "../page-type-config/page-type-config.module.code.ts"
import { applySelect } from "../routing-core/routing-core.module.code.ts"
import type { PageSelect } from "../types/types.module.code.ts"

const SEQUENCE_PAGE_SIZE = 500

export type GetOrderedChildrenArgs = {
  pageTypeSlug: string
  parentId: string
  select?: PageSelect
  limit?: number
}

export async function getOrderedChildren(args: GetOrderedChildrenArgs): Promise<readonly Page[]> {
  const config = await getSequenceConfig({ pageTypeSlug: args.pageTypeSlug })
  if (config == null) {
    throw new Error(
      `getOrderedChildren(${args.pageTypeSlug}): page-type declares no sequence config`
    )
  }
  const dir = config.direction ?? "asc"
  const walk = streamPages({
    pageTypeSlug: args.pageTypeSlug,
    where: [{ key: config.groupBy, eq: args.parentId }],
    order: [{ by: config.orderBy, dir }],
    select: args.select,
    pageSize: SEQUENCE_PAGE_SIZE,
    max: args.limit,
  })
  return await Array.fromAsync(walk)
}

export type OrderedNeighbors = { prev: Page | null; next: Page | null }

export type GetOrderedNeighborsArgs = {
  page: Page
  select?: PageSelect
}

export async function getOrderedNeighbors(
  args: GetOrderedNeighborsArgs
): Promise<OrderedNeighbors> {
  const { page } = args
  const config: SequenceConfig | null = await getSequenceConfig({
    pageTypeSlug: page.pageTypeSlug,
  })
  if (config == null) {
    throw new Error(
      `getOrderedNeighbors(${page.pageTypeSlug}): page-type declares no sequence config`
    )
  }
  const groupValue: Json = page[config.groupBy] ?? null
  const dir = config.direction ?? "asc"

  const walk = streamPages({
    pageTypeSlug: page.pageTypeSlug,
    where: [{ key: config.groupBy, eq: groupValue }],
    order: [{ by: config.orderBy, dir }],
    select: args.select === undefined ? undefined : [...new Set([...args.select, "id"])],
    pageSize: SEQUENCE_PAGE_SIZE,
  })

  const shown = (one: Page | null): Page | null =>
    one === null ? null : applySelect(one, args.select)

  let prev: Page | null = null
  let found = false
  for await (const one of walk) {
    if (found) return { prev: shown(prev), next: shown(one) }
    if (one.id === page.id) found = true
    else prev = one
  }
  return found ? { prev: shown(prev), next: null } : { prev: null, next: null }
}
