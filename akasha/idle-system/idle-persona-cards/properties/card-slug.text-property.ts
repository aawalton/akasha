import type { TextProperty } from "@akasha/pages-system/text-property"

export type CardSlug = string

export const cardSlug = {
  id: "01a06596-f0d5-7008-953b-4006bde89bad",
  pageTypeSlug: "text-property",
  slug: "card-slug",
  propertySlug: "card-slug",
  definition: "which of the cards this one is, the same name in every player's deck",
  max: 100,
  nameFormatSlug: "name-format/lower-kebab-case",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Every player holds a card of every name.",
    },
    {
      invariantKind: "departure",
      statement: "A card still locked names the card it would be without naming the persona.",
    },
  ],
} as const satisfies TextProperty
