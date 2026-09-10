import type { PageQuery } from "../page-query.page-type.types.ts"

export const relationshipDepositsAll = {
  id: "01a063f9-220c-7d27-ad28-7e5325299e0f",
  pageTypeSlug: "page-query",
  type: "page-query",
  slug: "relationship-deposits-all",
  asksOfSlug: "relationship-deposit",
  keys: [
    "relationshipDepositPersonaSlug",
    "relationshipDepositRelationshipSlug",
    "relationshipDepositDate",
    "relationshipDepositSize",
    "relationshipDepositValueSlug",
  ],
} as const satisfies PageQuery
