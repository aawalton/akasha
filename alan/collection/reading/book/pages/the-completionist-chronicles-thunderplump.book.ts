import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theCompletionistChroniclesThunderplump = {
  id: "019db533-f391-783b-8e59-fecf61241853",
  type: "page-type/book",
  slug: "the-completionist-chronicles-thunderplump",
  title: "The Completionist Chronicles: Thunderplump",
  status: "not-started",
  unit: "unit/words",
  position: 11,
  ownLength: 94000,
  publishedAt: "2023-12-05",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CGMJ18J9",
      externalLink: "https://amazon.com/dp/B0CGMJ18J9",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
