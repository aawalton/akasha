import type { Domain } from "../../../domain-system/domain/domain.page-type.ts"

export const temperGear = {
  id: "01a05fba-ce3c-7cc6-bd0f-2d8917043895",
  pageTypeSlug: "domain",
  slug: "temper-gear",
  definition: "what a character wears, wields and makes",
  pluralSlug: "temper-gears",
  partSlugs: ["page-type/temper-armor-trait"],
} as const satisfies Domain
