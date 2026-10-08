import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theCompletionistChroniclesUntapped = {
  id: "019db533-f391-7844-acc0-be95b6009cbe",
  type: "page-type/book",
  slug: "the-completionist-chronicles-untapped",
  title: "The Completionist Chronicles: Untapped",
  status: "not-started",
  unit: "unit/words",
  position: 12,
  ownLength: 138000,
  publishedAt: "2025-08-11",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0FH5NTTNP",
      externalLink: "https://amazon.com/dp/B0FH5NTTNP",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
