import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import {
  pointsOn,
  requestsFor,
} from "akasha/product/kofi/feature-request/modules/serving/feature-request-serving.module.code.ts"

const PUBLISHED = "published"

export type ListedRequest = {
  readonly id: string
  readonly slug: string
  readonly title: string
  readonly ask: string
  readonly points: number
  readonly boosters: number
}

export type Listing = {
  readonly requests: readonly ListedRequest[]
}

function listed(request: Page): ListedRequest {
  return {
    id: request.id,
    slug: request.slug ?? request.id,
    title: request.title ?? request.slug ?? request.id,
    ask: typeof request.ask === "string" ? request.ask : "",
    points: pointsOn(request),
    boosters: Array.isArray(request.boosts) ? request.boosts.length : 0,
  }
}

export async function listingFor(product: string): Promise<Listing> {
  const found = await requestsFor({ product, standings: [PUBLISHED] })
  return { requests: found.map(listed) }
}
