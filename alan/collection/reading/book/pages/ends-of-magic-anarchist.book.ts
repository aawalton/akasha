import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const endsOfMagicAnarchist = {
  id: "019db533-f390-7f7d-b6bf-b2bf64016f9d",
  type: "page-type/book",
  slug: "ends-of-magic-anarchist",
  title: "Ends of Magic: Anarchist",
  status: "completed",
  unit: "unit/words",
  position: 4,
  ownLength: 91000,
  ownProgress: 91000,
  publishedAt: "2024-08-16",
  partOfCollections: ["book-series/ends-of-magic"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0D47TCCBW",
      externalLink: "https://amazon.com/dp/B0D47TCCBW",
    },
  ],
} as const satisfies Book
