import type { ViewFilter, ViewSort } from "./view-data"

export interface CrossTypePredicate {
  key: string
  filters: readonly ViewFilter[]
  sorts: readonly ViewSort[]
  limit: number
}

const favorites: CrossTypePredicate = {
  key: "favorites",
  filters: [{ propertyId: "favoritedAt", operator: "is_not_empty" }],
  sorts: [{ field: "favoritedAt", direction: "desc" }],
  limit: 100,
}

const recentlyViewed: CrossTypePredicate = {
  key: "recently-viewed",
  filters: [{ propertyId: "lastViewedAt", operator: "is_not_empty" }],
  sorts: [{ field: "lastViewedAt", direction: "desc" }],
  limit: 100,
}

export const CROSS_TYPE_PREDICATES: Readonly<Record<string, CrossTypePredicate>> = {
  [favorites.key]: favorites,
  [recentlyViewed.key]: recentlyViewed,
}

export function getCrossTypePredicate(key: string): CrossTypePredicate | undefined {
  return CROSS_TYPE_PREDICATES[key]
}
