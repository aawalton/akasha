import type { Domain } from "../../../../domains/domain.page-type.types.ts"

export const fitness = {
  id: "01a06558-7000-7000-8000-000000000001",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "fitness",
  definition: "how Alan trains his body and what the training did",
  parts: [
    "page-type/equipment-item",
    "page-type/exercise",
    "page-type/mobility-reading",
    "page-type/schedule-day",
    "page-type/set-log",
    "page-type/selection-policy",
    "domain/fitness-coaching",
  ],
} as const satisfies Domain
