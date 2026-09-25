import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const fitness = {
  id: "01a06558-7000-7000-8000-000000000001",
  type: "page-type/domain",
  slug: "fitness",
  definition: "how Alan trains his body",
  parts: [
    "domain/fitness-coaching",
    "domain/flexibility",
    "domain/strength",
    "page-type/fitness-equipment",
    "page-type/selection-policy",
  ],
} as const satisfies Domain
