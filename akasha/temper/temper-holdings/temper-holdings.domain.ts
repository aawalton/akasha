import type { Domain } from "../../domain-system/domains/domain.page-type.ts"

export const temperHoldings = {
  id: "01a05fac-7582-7d58-82ce-cb03ba05751f",
  pageTypeSlug: "domain",
  slug: "temper-holdings",
  definition: "what an account holds and what the holdings are worth",
  pluralSlug: "temper-holdings-sets",
  partSlugs: [
    "page-type/temper-guild-trader",
    "page-type/temper-holdings-thing",
    "page-type/temper-inventory-chunk",
    "page-type/temper-inventory-currency",
    "page-type/temper-inventory-snapshot",
    "page-type/temper-item-category-tree",
    "page-type/temper-net-worth-hour",
    "page-type/temper-sale",
  ],
} as const satisfies Domain
