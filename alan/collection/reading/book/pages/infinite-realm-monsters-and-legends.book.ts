import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const infiniteRealmMonstersAndLegends = {
  id: "019db533-f391-7b4e-bab7-476f41b00745",
  type: "page-type/book",
  slug: "infinite-realm-monsters-and-legends",
  title: "Infinite Realm: Monsters and Legends",
  status: "not-started",
  unit: "unit/words",
  position: 1,
  ownLength: 275500,
  publishedAt: "2021-01-12",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08SC8QRPH",
      externalLink: "https://amazon.com/dp/B08SC8QRPH",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
