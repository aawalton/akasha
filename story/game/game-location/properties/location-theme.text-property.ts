import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const locationTheme = {
  id: "01a0c644-0cd0-737d-a018-b08f625629cf",
  type: "page-type/text-property",
  slug: "location-theme",
  propertySlug: "theme",
  definition: "what a place is about, written for the one running the game",
  maxLength: 2000,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A theme is read by the game master rather than shown to the player.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
