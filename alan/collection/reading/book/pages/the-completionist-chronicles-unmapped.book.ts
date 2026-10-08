import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theCompletionistChroniclesUnmapped = {
  id: "019db533-f386-7b1c-86ea-a9621b662811",
  type: "page-type/book",
  slug: "the-completionist-chronicles-unmapped",
  title: "The Completionist Chronicles: Unmapped",
  status: "not-started",
  unit: "unit/words",
  position: 13,
  ownLength: 500000,
  publishedAt: "2026-01-28",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0FLYR1DDN",
      externalLink: "https://amazon.com/dp/B0FLYR1DDN",
    },
  ],
  createdAt: "2026-04-22T12:39:34.022Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
