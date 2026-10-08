import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const azarinthHealerBook1 = {
  id: "019db533-f390-78ec-9069-e7528917fe02",
  type: "page-type/book",
  slug: "azarinth-healer-book-1",
  title: "Azarinth Healer",
  status: "completed",
  author: "Rhaegar",
  unit: "unit/words",
  position: 1,
  ownLength: 177000,
  ownProgress: 177000,
  publishedAt: "2022-12-01",
  partOfCollections: ["book-series/azarinth-healer"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BLRD8YPD",
      externalLink: "https://amazon.com/dp/B0BLRD8YPD",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
