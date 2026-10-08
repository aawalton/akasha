import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theWhisperingCrystalsUndividedWorlds = {
  id: "019db533-f38b-757c-bc60-b61fbfe4f987",
  type: "page-type/book",
  slug: "the-whispering-crystals-undivided-worlds",
  title: "The Whispering Crystals: Undivided Worlds",
  status: "completed",
  unit: "unit/words",
  position: 6,
  ownLength: 118750,
  ownProgress: 118750,
  publishedAt: "2023-12-17",
  partOfCollections: ["book-series/the-whispering-crystals"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CQK6TNQ4",
      externalLink: "https://amazon.com/dp/B0CQK6TNQ4",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
