import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const bushidoOnlineFriendsAndFoes = {
  id: "019db533-f390-7a64-aaa9-25077ea137de",
  type: "page-type/book",
  slug: "bushido-online-friends-and-foes",
  title: "Bushido Online: Friends and Foes",
  status: "completed",
  unit: "unit/words",
  position: 2,
  ownLength: 130000,
  ownProgress: 130000,
  publishedAt: "2018-02-01",
  partOfCollections: ["book-series/bushido-online"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B078TS4XPG",
      externalLink: "https://amazon.com/dp/B078TS4XPG",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
