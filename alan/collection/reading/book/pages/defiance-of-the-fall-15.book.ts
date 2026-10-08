import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const defianceOfTheFall15 = {
  id: "019db533-f390-7c8c-84a6-72dfa08ae3f3",
  type: "page-type/book",
  slug: "defiance-of-the-fall-15",
  title: "Defiance of the Fall 15",
  status: "completed",
  unit: "unit/words",
  position: 15,
  ownLength: 145000,
  ownProgress: 145000,
  publishedAt: "2025-07-16",
  partOfCollections: ["book-series/defiance-of-the-fall"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DQ23RTMF",
      externalLink: "https://amazon.com/dp/B0DQ23RTMF",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
