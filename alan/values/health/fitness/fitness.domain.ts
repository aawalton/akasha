import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const fitness = {
  id: "01a06558-7000-7000-8000-000000000001",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "fitness",
  definition: "how Alan trains his body and what the training did",
  parts: [
    "page-type/fitness-equipment",
    "page-type/exercise",
    "page-type/schedule-day",
    "page-type/selection-policy",
    "domain/fitness-coaching",
    "domain/flexibility",
    "domain/strength",
  ],
} as const satisfies Domain
