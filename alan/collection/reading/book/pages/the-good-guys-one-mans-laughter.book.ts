import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theGoodGuysOneMansLaughter = {
  id: "019db533-f391-78fd-a296-735b515151f5",
  type: "page-type/book",
  slug: "the-good-guys-one-mans-laughter",
  title: "The Good Guys: One Man's Laughter",
  status: "not-started",
  author: "Winsor McCay",
  unit: "unit/words",
  position: 16,
  ownLength: 144250,
  publishedAt: "2025-07-07",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0FH2MN1JP",
      externalLink: "https://amazon.com/dp/B0FH2MN1JP",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
