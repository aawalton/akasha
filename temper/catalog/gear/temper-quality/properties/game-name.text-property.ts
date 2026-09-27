import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const gameName = {
  id: "01a0e10f-604e-7bfd-9d06-e043676e7fa7",
  type: "page-type/text-property",
  slug: "game-name",
  propertySlug: "game-name",
  definition: "the name The Elder Scrolls Online shows a thing by",
  maxLength: 100,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the name the game itself shows is written here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page's title may differ from the name the game shows.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
