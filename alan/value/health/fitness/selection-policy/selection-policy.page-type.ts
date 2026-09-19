import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const selectionPolicy = {
  id: "01a06838-7a9d-7d0a-8e41-674ebea29caf",
  type: "page-type/page-type",
  slug: "selection-policy",
  definition: "the numbers the coach picks and bounds a session by",
  extends: ["page-type/page"],
  parts: [
    "number-property/bouts-without-progress",
    "number-property/near-failure-rpe-floor",
    "number-property/novelty-cap-per-session",
    "number-property/recency-saturation-days",
    "number-property/recency-weight",
    "number-property/weekly-set-ceiling",
    "number-property/weekly-set-floor",
    "number-property/weight-aesthetics",
    "number-property/weight-energy",
    "number-property/weight-functionality",
    "number-property/weight-longevity",
    "number-property/zone2-weekly-floor",
  ],
  properties: [
    { pageProperty: "number-property/weight-longevity", required: true, many: false },
    { pageProperty: "number-property/weight-energy", required: true, many: false },
    { pageProperty: "number-property/weight-functionality", required: true, many: false },
    { pageProperty: "number-property/weight-aesthetics", required: true, many: false },
    { pageProperty: "number-property/novelty-cap-per-session", required: true, many: false },
    { pageProperty: "number-property/weekly-set-floor", required: true, many: false },
    { pageProperty: "number-property/weekly-set-ceiling", required: true, many: false },
    { pageProperty: "number-property/zone2-weekly-floor", required: true, many: false },
    { pageProperty: "number-property/recency-weight", required: true, many: false },
    { pageProperty: "number-property/recency-saturation-days", required: true, many: false },
    { pageProperty: "number-property/near-failure-rpe-floor", required: true, many: false },
    { pageProperty: "number-property/bouts-without-progress", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One page has the numbers and there is never a second page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every number the selector weighs by is on this page rather than in code.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement: "A number missing here stops the selector rather than coming from somewhere else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each number the selector reads is a property of this page type.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No number here scales what is asked of Alan by how long Alan was away.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No number here holds a movement its place for a length of time.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement:
        "The goal weights are what a selector is judged against rather than what it reads.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
