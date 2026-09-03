import type { Domain } from "../../../domain-system/domains/domain.page-type.ts"

export const trackingDaily = {
  id: "01a062dc-1b7f-7c99-a886-e67035171fdf",
  pageTypeSlug: "domain",
  slug: "tracking-daily",
  definition: "what is measured about Alan a day at a time",
  partSlugs: [
    "page-type/email-entry",
    "page-type/eso-day",
    "page-type/wake-day",
    "module/day-figures",
    "module/day-narrow-types",
    "module/day-scan-window",
    "module/air-quality",
    "module/air-quality-fetch",
    "module/persona-recipe-rows",
    "module/persona-total-landing",
    "module/session-points-compute",
    "module/persona-day-points",
    "module/session-points-totals",
    "module/points-source-writer",
    "module/health-total-population",
    "module/health-total-points",
    "module/write-daily-points",
    "module/day-active-calories",
    "module/nutrition-grams",
    "module/nutrition-points",
    "module/task-completions",
    "module/task-points",
    "module/strength-points",
    "module/topic-words",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A wake day is the day Alan lives and an ESO day is the day Alan plays.",
    },
    {
      invariantKind: "departure",
      statement: "The page tracked is a day and the page type says which kind of day.",
    },
  ],
} as const satisfies Domain
