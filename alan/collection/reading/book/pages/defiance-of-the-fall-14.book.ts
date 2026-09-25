import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const defianceOfTheFall14 = {
  id: "019db533-f390-7cb4-b03c-b6a84f4f5964",
  type: "page-type/book",
  slug: "defiance-of-the-fall-14",
  title: "Defiance of the Fall 14",
  status: "completed",
  unit: "unit/words",
  position: 14,
  ownLength: 146000,
  ownProgress: 146000,
  publishedAt: "2024-12-18",
  partOfCollections: ["book-series/defiance-of-the-fall"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0D2LJ6SJ2",
      externalLink: "https://amazon.com/dp/B0D2LJ6SJ2",
    },
  ],
} as const satisfies Book
