import type { Json } from "akasha/code/type/narrowing/modules/json-value/json-value.module.code.ts"
import { streamPages } from "akasha/page/access/modules/iterate/iterate.module.code.ts"
import { getSequenceConfig } from "akasha/page/access/modules/page-type-config/page-type-config.module.code.ts"
import { applySelect } from "akasha/page/access/modules/routing-core/routing-core.module.code.ts"
import type { PageSelect } from "akasha/page/access/modules/types/types.module.code.ts"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import type { SequenceConfig } from "akasha/page/core/schema/modules/sequence-config/sequence-config.module.code.ts"

const SEQUENCE_PAGE_SIZE = 500

type OrderedNeighbors = { prev: Page | null; next: Page | null }

type GetOrderedNeighborsArgs = {
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
