import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const movementRestriction = {
  id: "01a0b701-cf5a-7a05-8428-2b41611a70f4",
  type: "page-type/page-type",
  slug: "movement-restriction",
  definition: "a movement Alan may not be offered, and the day that is tested again",
  extends: ["page-type/page"],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    { pageProperty: "select-property/movement-pattern", required: true, many: false },
    { pageProperty: "calendar-date-property/tested-again", required: true, many: false },
  ],
  types: "ts",
  schema: "jsonl",
  parts: ["calendar-date-property/tested-again"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A restriction keeps out a movement pattern rather than one movement.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pattern no restriction names is offered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A restriction past the day it names keeps its pattern out until Alan tests that restriction.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A restriction is deleted rather than marked over when Alan may perform the pattern again.",
    },
  ],
} as const satisfies PageType
