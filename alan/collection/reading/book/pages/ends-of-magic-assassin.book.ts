import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const endsOfMagicAssassin = {
  id: "019db533-f390-7f94-a849-91d531e1faa2",
  type: "page-type/book",
  slug: "ends-of-magic-assassin",
  title: "Ends of Magic: Assassin",
  status: "completed",
  author: "L. Fletcher Prouty",
  unit: "unit/words",
  position: 3,
  ownLength: 99500,
  ownProgress: 99500,
  publishedAt: "2024-05-15",
  partOfCollections: ["book-series/ends-of-magic"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CTCCKYGQ",
      externalLink: "https://amazon.com/dp/B0CTCCKYGQ",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
