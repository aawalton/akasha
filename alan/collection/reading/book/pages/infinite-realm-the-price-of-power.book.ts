import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const infiniteRealmThePriceOfPower = {
  id: "019db533-f391-7b62-ab98-986f7812fde9",
  type: "page-type/book",
  slug: "infinite-realm-the-price-of-power",
  title: "Infinite Realm: The Price of Power",
  status: "not-started",
  unit: "unit/words",
  position: 2,
  ownLength: 287750,
  publishedAt: "2021-05-24",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08YRNYZW3",
      externalLink: "https://amazon.com/dp/B08YRNYZW3",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
