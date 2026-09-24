import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const dayBoundary = {
  id: "01a05c77-31e4-7f97-8fe6-c273915285af",
  type: "page-type/domain",
  slug: "day-boundary",
  definition: "when Alan's day starts",
  parts: [
    "module/day-string",
    "module/eso-day",
    "module/mountain-day",
    "module/mountain-wall",
    "computed-property-module/us-zone-offset",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A day is a dashed date rather than a Date.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No zone database is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A boundary is stored nowhere.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The day is derived in one place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A day turns where Alan's sleep says it turned, and at the ESO reset where no sleep says.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The ESO reset is Alan's own turn between days rather than an arbitrary hour.",
    },
  ],
} as const satisfies Domain
