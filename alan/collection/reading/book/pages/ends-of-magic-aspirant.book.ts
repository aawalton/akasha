import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const endsOfMagicAspirant = {
  id: "019db533-f390-7f66-860a-4c61325e1460",
  type: "page-type/book",
  slug: "ends-of-magic-aspirant",
  title: "Ends of Magic: Aspirant",
  status: "completed",
  author: "Chad Corrie",
  unit: "unit/words",
  position: 5,
  ownLength: 132500,
  ownProgress: 132500,
  publishedAt: "2025-01-28",
  partOfCollections: ["book-series/ends-of-magic"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DCW4SF5Z",
      externalLink: "https://amazon.com/dp/B0DCW4SF5Z",
    },
  ],
} as const satisfies Book
