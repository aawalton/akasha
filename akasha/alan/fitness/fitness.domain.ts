import type { Domain } from "../../domain-system/domains/domain.page-type.ts"

export const fitness = {
  id: "01a06558-7000-7000-8000-000000000001",
  pageTypeSlug: "domain",
  slug: "fitness",
  definition: "how Alan trains his body and what the training did",
  partSlugs: [
    "page-type/client-profile",
    "page-type/coaching-constraint",
    "page-type/equipment-item",
    "page-type/exercise",
    "page-type/exercise-collection",
    "page-type/mobility-reading",
    "page-type/schedule-day",
    "page-type/set-log",
    "page-type/workout-schedule",
    "page-type/workout-session",
    "workspace-package/exercise-access",
  ],
} as const satisfies Domain
