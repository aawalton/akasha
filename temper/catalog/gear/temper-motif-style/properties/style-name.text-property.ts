import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const styleName = {
  id: "01a0e0ee-e841-7e6c-b6dd-77210866c295",
  type: "page-type/text-property",
  slug: "style-name",
  propertySlug: "style-name",
  definition: "the name The Elder Scrolls Online shows a crafting style by",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the game's own answer for a style's number is written here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No style name is made from the name of a game constant.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
