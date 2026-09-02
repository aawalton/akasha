import type { Domain } from "../../domain-system/domain/domain.page-type.ts"

export const temperProgress = {
  id: "01a05fac-7582-726f-ac10-d5261c7e1f65",
  pageTypeSlug: "domain",
  slug: "temper-progress",
  definition: "what has been done in the game and what is left",
  pluralSlug: "temper-progressions",
  partSlugs: [
    "page-type/temper-activity-category",
    "page-type/temper-comparison-op",
    "page-type/temper-completion-category",
    "page-type/temper-metric-tree",
    "page-type/temper-progress-thing",
    "page-type/temper-rotation-breakdown-row",
  ],
} as const satisfies Domain
