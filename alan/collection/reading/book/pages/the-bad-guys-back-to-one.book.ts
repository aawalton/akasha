import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theBadGuysBackToOne = {
  id: "019db533-f391-779b-8ac8-6e8544ad6615",
  type: "page-type/book",
  slug: "the-bad-guys-back-to-one",
  title: "The Bad Guys: Back to One",
  status: "not-started",
  author: "Graham Moore",
  unit: "unit/words",
  position: 7,
  ownLength: 93000,
  publishedAt: "2021-09-11",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08QQ6J1LH",
      externalLink: "https://amazon.com/dp/B08QQ6J1LH",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
