import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const scaleAndSeaTrilogyDarkLord = {
  id: "019db533-f38a-74a7-b762-b4a436a319c4",
  type: "page-type/book",
  slug: "scale-and-sea-trilogy-dark-lord",
  title: "Scale & Sea Trilogy: Dark Lord",
  status: "completed",
  unit: "unit/words",
  position: 3,
  ownLength: 119500,
  ownProgress: 119500,
  publishedAt: "2025-07-31",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0F8PYTK9C",
      externalLink: "https://amazon.com/dp/B0F8PYTK9C",
    },
  ],
} as const satisfies Book
