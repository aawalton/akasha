import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const carResearch = {
  id: "01a065a0-0000-7000-8000-000000000402",
  type: "page-type/domain",
  slug: "car-research",
  definition: "what Alan read about cars",
  parts: [
    "page-type/car",
    "page-type/car-make",
    "page-type/car-model",
    "page-type/car-trim",
    "page-type/car-year",
  ],
} as const satisfies Domain
