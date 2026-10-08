import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const awakenOnlineArmageddon = {
  id: "019db533-f390-7853-bd29-f4418760c46f",
  type: "page-type/book",
  slug: "awaken-online-armageddon",
  title: "Awaken Online: Armageddon",
  status: "completed",
  unit: "unit/words",
  position: 10,
  ownLength: 161250,
  ownProgress: 161250,
  publishedAt: "2022-10-01",
  partOfCollections: ["book-series/awaken-online"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0B9D9QHLS",
      externalLink: "https://amazon.com/dp/B0B9D9QHLS",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
