import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const selectionPolicy = {
  id: "01a06838-7a9d-7d0a-8e41-674ebea29caf",
  type: "page-type/page-type",
  slug: "selection-policy",
  definition: "the coach's numbers for bounding Alan's training",
  extends: ["page-type/page"],
  parts: [
    "number-property/near-failure-rpe-floor",
    "number-property/novelty-cap-per-session",
    "number-property/weekly-set-ceiling",
    "number-property/weekly-set-floor",
    "number-property/stretches-cooling-down",
    "number-property/seconds-holding-stretch",
    "number-property/volume-target-seed",
    "number-property/volume-target-rise",
    "number-property/volume-target-fall",
    "calendar-date-property/volume-target-from",
  ],
  properties: [
    { pageProperty: "number-property/novelty-cap-per-session", required: true, many: false },
    { pageProperty: "number-property/weekly-set-floor", required: true, many: false },
    { pageProperty: "number-property/weekly-set-ceiling", required: true, many: false },
    { pageProperty: "number-property/near-failure-rpe-floor", required: true, many: false },
    { pageProperty: "number-property/stretches-cooling-down", required: true, many: false },
    { pageProperty: "number-property/seconds-holding-stretch", required: true, many: false },
    { pageProperty: "number-property/volume-target-seed", required: true, many: false },
    { pageProperty: "number-property/volume-target-rise", required: true, many: false },
    { pageProperty: "number-property/volume-target-fall", required: true, many: false },
    { pageProperty: "calendar-date-property/volume-target-from", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One page has the numbers and there is never a second page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every number a fitness command bounds the training by is on this page rather than in code.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A number missing here stops the command reading it rather than coming from somewhere else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each number a fitness command reads here is a property of this page type.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No number here scales what is asked of Alan by how long Alan was away.",
    },
  ],
  types: "ts",
  schema: "jsonl",
  updatedAt: "2026-10-08T15:16:59.673Z",
} as const satisfies PageType
