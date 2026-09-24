import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const turnPools = {
  id: "01a0c69c-5e8f-723a-a541-33dd17912c80",
  type: "page-type/record-property",
  slug: "turn-pools",
  propertySlug: "pools",
  definition: "what each pool play spends held at a turn, and what that turn took from it",
  properties: [
    { pageProperty: "text-property/listed-name", required: true, many: false },
    { pageProperty: "number-property/pool-now", required: true, many: false },
    { pageProperty: "number-property/pool-most", required: false, many: false },
    { pageProperty: "number-property/pool-change", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The pools a turn carries are the pools of the one its game's player runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A pool a turn left alone says what it held and says no change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pools a game spends are its own words rather than one list.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
