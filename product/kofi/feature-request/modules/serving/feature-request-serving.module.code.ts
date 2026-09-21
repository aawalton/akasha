import { collectPages } from "akasha/page/access/modules/iterate/iterate.module.code.ts"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"

const PAGE_TYPE_SLUG = "feature-request"

const PAGE_SIZE = 1000

export type RequestsForArgs = {
  readonly product: string
  readonly standings: readonly string[]
}

function pointsIn(backing: unknown): number {
  if (backing === null || typeof backing !== "object" || Array.isArray(backing)) return 0
  const points = (backing as Readonly<Record<string, unknown>>).points
  return typeof points === "number" && Number.isFinite(points) ? points : 0
}

export function pointsOn(request: Page): number {
  const backing = request.backing
  if (!Array.isArray(backing)) return 0
  return backing.reduce((sum: number, one: unknown) => sum + pointsIn(one), 0)
}

function newestFirst(one: Page, other: Page): number {
  if (one.id === other.id) return 0
  return one.id > other.id ? -1 : 1
}

export async function requestsFor(args: RequestsForArgs): Promise<Page[]> {
  const found = await collectPages({
    pageTypeSlug: PAGE_TYPE_SLUG,
    where: [
      { key: "product", eq: args.product },
      { key: "standing", in: args.standings },
    ],
    pageSize: PAGE_SIZE,
  })
  return [...found].sort((one, other) => pointsOn(other) - pointsOn(one) || newestFirst(one, other))
}
