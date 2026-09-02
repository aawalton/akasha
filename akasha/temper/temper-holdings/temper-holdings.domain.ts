import type { Domain } from "../../domain-system/domain/domain.page-type.ts"

export const temperHoldings = {
  id: "01a05fac-7582-7d58-82ce-cb03ba05751f",
  pageTypeSlug: "domain",
  slug: "temper-holdings",
  definition: "what an account holds and what the holdings are worth",
  pluralSlug: "temper-holdings-sets",
} as const satisfies Domain
