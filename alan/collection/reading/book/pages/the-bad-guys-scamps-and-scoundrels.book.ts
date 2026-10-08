import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theBadGuysScampsAndScoundrels = {
  id: "019db533-f391-77d8-a847-714dc992214c",
  type: "page-type/book",
  slug: "the-bad-guys-scamps-and-scoundrels",
  title: "The Bad Guys: Scamps & Scoundrels",
  status: "completed",
  unit: "unit/words",
  position: 1,
  ownLength: 114250,
  ownProgress: 114250,
  publishedAt: "2019-08-15",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07SQHZB29",
      externalLink: "https://amazon.com/dp/B07SQHZB29",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
