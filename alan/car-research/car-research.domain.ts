import type { Domain } from "../../domains/domain.page-type.ts"

export const carResearch = {
  id: "01a065a0-0000-7000-8000-000000000402",
  pageTypeSlug: "domain",
  slug: "car-research",
  definition: "what Alan read about the cars on sale while deciding what to buy",
  partSlugs: [
    "page-type/car",
    "page-type/car-make",
    "page-type/car-model",
    "page-type/car-trim",
    "page-type/car-year",
  ],
} as const satisfies Domain
