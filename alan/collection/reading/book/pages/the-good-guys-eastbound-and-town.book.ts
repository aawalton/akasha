import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theGoodGuysEastboundAndTown = {
  id: "019db533-f391-7954-a627-e0f676cd5236",
  type: "page-type/book",
  slug: "the-good-guys-eastbound-and-town",
  title: "The Good Guys: Eastbound and Town",
  status: "completed",
  unit: "unit/words",
  position: 8,
  ownLength: 91000,
  ownProgress: 91000,
  publishedAt: "2020-04-02",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B082J9H95S",
      externalLink: "https://amazon.com/dp/B082J9H95S",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
