import type { TextProperty } from "@akasha/pages/text-property"

export type CardSlug = string

export const cardSlug = {
  id: "01a06596-f0d5-7008-953b-4006bde89bad",
  pageTypeSlug: "text-property",
  type: "text-property",
  slug: "card-slug",
  propertySlug: "card-slug",
  definition: "which of the cards this one is, the same name in every player's deck",
  maxLength: 100,
  nameFormat: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every player has a card of every name.",
    },
    {
      invariantKind: "departure",
      statement:
        "A card still locked names the card that card would be without naming the persona.",
    },
  ],
} as const satisfies TextProperty
