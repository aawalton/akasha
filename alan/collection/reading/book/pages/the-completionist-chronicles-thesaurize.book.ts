import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theCompletionistChroniclesThesaurize = {
  id: "019db533-f391-784d-96f2-48941ef4b356",
  type: "page-type/book",
  slug: "the-completionist-chronicles-thesaurize",
  title: "The Completionist Chronicles: Thesaurize",
  status: "not-started",
  unit: "unit/words",
  position: 10,
  ownLength: 90500,
  publishedAt: "2023-11-07",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CGMHKZRY",
      externalLink: "https://amazon.com/dp/B0CGMHKZRY",
    },
  ],
} as const satisfies Book
