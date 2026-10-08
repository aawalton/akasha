import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const aThousandLiTheThirdRealm = {
  id: "019db533-f390-75f5-9943-ec629524782c",
  type: "page-type/book",
  slug: "a-thousand-li-the-third-realm",
  title: "A Thousand Li: The Third Realm",
  status: "completed",
  author: "Tao Wong",
  unit: "unit/words",
  position: 8,
  ownLength: 125250,
  ownProgress: 125250,
  publishedAt: "2023-02-01",
  partOfCollections: ["book-series/a-thousand-li"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0B4PW3V2D",
      externalLink: "https://amazon.com/dp/B0B4PW3V2D",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
