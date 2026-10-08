import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theFirebrandEmbersOfRebellion = {
  id: "019db533-f38a-7335-a9b2-d04771e0d06c",
  type: "page-type/book",
  slug: "the-firebrand-embers-of-rebellion",
  title: "The Firebrand: Embers of Rebellion",
  status: "completed",
  unit: "unit/words",
  position: 2,
  ownLength: 107000,
  ownProgress: 107000,
  publishedAt: "2019-04-11",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07Q34J1KW",
      externalLink: "https://amazon.com/dp/B07Q34J1KW",
    },
  ],
  createdAt: "2026-04-22T12:39:34.026Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
