import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const guardianOfAsterFallMoonlightRelic = {
  id: "019db533-f390-7faa-9b7f-4564c5acba53",
  type: "page-type/book",
  slug: "guardian-of-aster-fall-moonlight-relic",
  title: "Guardian of Aster Fall: Moonlight Relic",
  status: "completed",
  author: "David North",
  unit: "unit/words",
  position: 3,
  ownLength: 111250,
  ownProgress: 111250,
  publishedAt: "2022-06-21",
  partOfCollections: ["book-series/guardian-of-aster-fall"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09W7BQB41",
      externalLink: "https://amazon.com/dp/B09W7BQB41",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
