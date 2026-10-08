import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theCompletionistChroniclesRexusSideQuest = {
  id: "019db533-f391-7866-8a4f-00e78341263b",
  type: "page-type/book",
  slug: "the-completionist-chronicles-rexus-side-quest",
  title: "The Completionist Chronicles: Rexus, Side Quest",
  status: "completed",
  unit: "unit/words",
  position: 3,
  ownLength: 50000,
  ownProgress: 50000,
  publishedAt: "2022-09-16",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BFM8Q85M",
      externalLink: "https://amazon.com/dp/B0BFM8Q85M",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
