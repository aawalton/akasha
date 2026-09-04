import type { Domain } from "../../../domain-system/domains/domain.page-type.ts"

export const money = {
  id: "01a0675b-16f3-7280-8bde-5f9dbd22d675",
  pageTypeSlug: "domain",
  slug: "money",
  definition: "what Alan has, owes and spends",
} as const satisfies Domain
