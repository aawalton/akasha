import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const whiteSandBrandonSandersonsWhiteSandVol2 = {
  id: "019db533-f38a-7bfe-a09b-08092b9af417",
  type: "page-type/book",
  slug: "white-sand-brandon-sandersons-white-sand-vol-2",
  title: "White Sand: Brandon Sanderson's White Sand Vol. 2",
  status: "not-started",
  unit: "unit/words",
  position: 2,
  ownLength: 38000,
  publishedAt: "2018-02-21",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0759PD6ZW",
      externalLink: "https://amazon.com/dp/B0759PD6ZW",
    },
  ],
  createdAt: "2026-04-22T12:39:34.026Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
