import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theBadGuysOnAThroneOfLies = {
  id: "019db533-f391-776d-ab4e-8a4e2401fe5a",
  type: "page-type/book",
  slug: "the-bad-guys-on-a-throne-of-lies",
  title: "The Bad Guys: On a Throne of Lies",
  status: "not-started",
  author: "SuperSummary",
  unit: "unit/words",
  position: 10,
  ownLength: 108750,
  publishedAt: "2023-07-22",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0B53WKS1P",
      externalLink: "https://amazon.com/dp/B0B53WKS1P",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
