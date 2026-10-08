import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const endsOfMagicAntimage = {
  id: "019db533-f390-7f88-a945-dcadae075e1a",
  type: "page-type/book",
  slug: "ends-of-magic-antimage",
  title: "Ends of Magic: Antimage",
  status: "completed",
  unit: "unit/words",
  position: 1,
  ownLength: 137000,
  ownProgress: 137000,
  publishedAt: "2023-10-10",
  partOfCollections: ["book-series/ends-of-magic"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CJBL9RXV",
      externalLink: "https://amazon.com/dp/B0CJBL9RXV",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
