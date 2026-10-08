import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const secondAgeOfRethraTheRevived = {
  id: "019db533-f38a-7d6b-bb5b-c405747cb2f8",
  type: "page-type/book",
  slug: "second-age-of-rethra-the-revived",
  title: "Second Age of Rethra: The Revived",
  status: "completed",
  grade: "A",
  unit: "unit/words",
  position: 3,
  ownLength: 106500,
  ownProgress: 106500,
  publishedAt: "2018-09-14",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07H78W9WR",
      externalLink: "https://amazon.com/dp/B07H78W9WR",
    },
  ],
  createdAt: "2026-04-22T12:39:34.026Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
