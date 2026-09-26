import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const turnAction = {
  id: "01a0deae-42b1-76ed-84f7-2a78c60194f3",
  type: "page-type/text-property",
  slug: "turn-action",
  propertySlug: "action",
  definition: "the action a player typed to make a played turn",
  maxLength: 4000,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The action is kept as the player typed it.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
