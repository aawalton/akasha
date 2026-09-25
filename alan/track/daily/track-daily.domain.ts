import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const trackDaily = {
  id: "01a062dc-1b7f-7c99-a886-e67035171fdf",
  type: "page-type/domain",
  slug: "track-daily",
  definition: "how Alan measures his day",
  parts: [
    "module/akasha-day",
    "module/day-active-calories",
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
    "module/topic-words",
    "module/track-pages",
    "module/track-resolve",
    "module/track-shape",
    "module/write-daily-points",
    "page-type/day",
    "service-workstation/active-calories-service",
    "service-workstation/topic-words-service",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A day is the day Alan lives and an ESO day is the day Alan plays.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ESO day is a boundary rather than a page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An ESO day decides which day a health reading, a listen or a location trace is filed under.",
    },
  ],
} as const satisfies Domain
