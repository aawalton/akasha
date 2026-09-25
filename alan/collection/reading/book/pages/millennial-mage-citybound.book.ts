import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const millennialMageCitybound = {
  id: "019db533-f391-72bb-81e5-a0421d645817",
  type: "page-type/book",
  slug: "millennial-mage-citybound",
  title: "Millennial Mage: Citybound",
  status: "completed",
  unit: "unit/words",
  position: 9,
  ownLength: 163750,
  ownProgress: 163750,
  publishedAt: "2025-04-16",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DK2GFMTZ",
      externalLink: "https://amazon.com/dp/B0DK2GFMTZ",
    },
  ],
} as const satisfies Book
