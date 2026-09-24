import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const turnRungs = {
  id: "01a0c6a3-8727-7638-9ad4-400f03486439",
  type: "page-type/record-property",
  slug: "turn-rungs",
  propertySlug: "rungs",
  definition:
    "the rung each of the player's skills had reached at a turn, as the ladder worked it out",
  properties: [
    { pageProperty: "text-property/listed-name", required: true, many: false },
    { pageProperty: "text-property/listed-rung", required: true, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A name here is the skill's name on the player's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The skill ladder works a rung out from a skill's progress, and the turn keeps it.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
