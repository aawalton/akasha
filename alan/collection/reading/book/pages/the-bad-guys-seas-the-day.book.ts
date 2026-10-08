import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theBadGuysSeasTheDay = {
  id: "019db533-f391-77b5-85a7-b25fc5363c95",
  type: "page-type/book",
  slug: "the-bad-guys-seas-the-day",
  title: "The Bad Guys: Seas the Day",
  status: "completed",
  author: "SuperSummary",
  unit: "unit/words",
  position: 5,
  ownLength: 106500,
  ownProgress: 106500,
  publishedAt: "2020-10-22",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08F6YVCDB",
      externalLink: "https://amazon.com/dp/B08F6YVCDB",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
