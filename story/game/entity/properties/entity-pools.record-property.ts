import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const entityPools = {
  id: "01a0c671-31d2-7602-8a22-1443f9b9b221",
  type: "page-type/record-property",
  slug: "entity-pools",
  propertySlug: "pools",
  definition: "what an entity has left of each thing play spends",
  properties: [
    { pageProperty: "text-property/listed-name", required: true, many: false },
    { pageProperty: "number-property/pool-now", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "What a player has left is written on the page of the one it is left to.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entity a game resets between encounters writes nothing here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The pools a game spends are its own words rather than one list.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
