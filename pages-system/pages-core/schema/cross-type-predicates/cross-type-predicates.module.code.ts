import type { ViewFilter, ViewSort } from "../view-data/view-data.module.code.ts"

export interface CrossTypePredicate {
  key: string
  filters: readonly ViewFilter[]
  sorts: readonly ViewSort[]
  limit: number
}

const FAVORITES: CrossTypePredicate = {
  key: "FAVORITES",
  filters: [{ propertyId: "favoritedAt", operator: "is_not_empty" }],
  sorts: [{ field: "favoritedAt", direction: "desc" }],
  limit: 100,
}

const RECENTLY_VIEWED: CrossTypePredicate = {
  key: "recently-viewed",
  filters: [{ propertyId: "lastViewedAt", operator: "is_not_empty" }],
  sorts: [{ field: "lastViewedAt", direction: "desc" }],
  limit: 100,
}

export const CROSS_TYPE_PREDICATES: Readonly<Record<string, CrossTypePredicate>> = {
  [FAVORITES.key]: FAVORITES,
  [RECENTLY_VIEWED.key]: RECENTLY_VIEWED,
}

export function getCrossTypePredicate(key: string): CrossTypePredicate | undefined {
  return CROSS_TYPE_PREDICATES[key]
}
