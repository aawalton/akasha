import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const whiteSandBrandonSandersonsWhiteSandVol1 = {
  id: "019db533-f38a-7c29-9473-afee9126d674",
  type: "page-type/book",
  slug: "white-sand-brandon-sandersons-white-sand-vol-1",
  title: "White Sand: Brandon Sanderson's White Sand Vol. 1",
  status: "not-started",
  unit: "unit/words",
  position: 1,
  ownLength: 39250,
  publishedAt: "2016-06-29",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B01E62OKF8",
      externalLink: "https://amazon.com/dp/B01E62OKF8",
    },
  ],
} as const satisfies Book
