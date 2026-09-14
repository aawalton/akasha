import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const trackDaily = {
  id: "01a062dc-1b7f-7c99-a886-e67035171fdf",
  type: "domain",
  slug: "track-daily",
  definition: "what is measured about Alan a day at a time",
  parts: [
    "module/akasha-day",
    "module/day-active-calories",
    "module/day-completions",
    "module/day-entry-keys",
    "module/day-messages",
    "module/day-messages-mining",
    "module/day-messages-totalling",
    "module/day-narrow-types",
    "module/day-opening",
    "module/day-place",
    "module/day-reading",
    "module/day-scan-window",
    "module/day-stretches",
    "module/nutrition-grams",
    "module/nutrition-points",
    "module/task-completions",
    "module/topic-words",
    "module/track-pages",
    "module/track-resolve",
    "module/track-shape",
    "module/write-daily-points",
    "page-type/day",
    "service-workstation/active-calories-service",
    "service-workstation/topic-words-service",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A day is the day Alan lives and an ESO day is the day Alan plays.",
    },
    {
      invariantKind: "departure",
      statement: "An ESO day is a boundary rather than a page.",
    },
    {
      invariantKind: "departure",
      statement: "An ESO day decides which day a health reading or a listen is filed under.",
    },
  ],
} as const satisfies Domain
