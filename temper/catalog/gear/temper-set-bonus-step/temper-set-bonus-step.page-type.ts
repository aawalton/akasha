import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const temperSetBonusStep = {
  id: "01a0e170-bc42-78ef-bd36-7a8d9ad41985",
  type: "page-type/page-type",
  slug: "temper-set-bonus-step",
  definition: "a scale the averaged quality of a worn set's pieces is read down to",
  extends: ["page-type/temper-thing"],
  properties: [{ pageProperty: "number-property/set-bonus-scale", required: true, many: false }],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An average at or above a step is read as the highest step it reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An average below every step is used as it is.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
