import type { TextProperty } from "akasha/page/text-property/text-property.page-type.types.ts"

export const coffeeShopDateKnowing = {
  id: "01a0deed-a4cc-789a-84ee-70d4b124c267",
  type: "page-type/text-property",
  slug: "coffee-shop-date-knowing",
  propertySlug: "knowing",
  definition: "what a character in the Coffee Shop Date has as so",
  maxLength: 2000,
  nameFormat: null,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A character's knowing is free to differ from the story's true state.",
    },
  ],
  types: "ts",
} as const satisfies TextProperty
