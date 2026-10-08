import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theGoodGuysOfSlicingMen = {
  id: "019db533-f391-7943-ac5f-b17fdff21d45",
  type: "page-type/book",
  slug: "the-good-guys-of-slicing-men",
  title: "The Good Guys: Of Slicing Men",
  status: "not-started",
  unit: "unit/words",
  position: 14,
  ownLength: 109500,
  publishedAt: "2023-04-30",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09X4D4QMY",
      externalLink: "https://amazon.com/dp/B09X4D4QMY",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
