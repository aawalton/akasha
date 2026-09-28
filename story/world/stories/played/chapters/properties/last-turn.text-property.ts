import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const lastTurn = {
  id: "01a0e5d3-d337-7946-9983-82bda3d41a93",
  type: "page-type/text-property",
  slug: "last-turn",
  propertySlug: "last-turn",
  definition: "the slug of the last turn a chapter took",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The next turn of a story left with no open turn follows the turn named here.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
