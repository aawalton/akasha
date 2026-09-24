import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const locationThings = {
  id: "01a0c646-0dc8-7dee-9127-0870839eb9fd",
  type: "page-type/record-property",
  slug: "location-things",
  propertySlug: "things",
  definition: "what is in a place for the player to look at, use or take",
  properties: [
    { pageProperty: "text-property/listed-name", required: true, many: false },
    { pageProperty: "text-property/thing-use", required: false, many: false },
    { pageProperty: "text-property/listed-note", required: false, many: false },
    { pageProperty: "text-property/thing-status", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A thing a player takes is written off the place rather than taken away from it.",
    },
  ],
  types: "ts",
} as const satisfies RecordProperty
