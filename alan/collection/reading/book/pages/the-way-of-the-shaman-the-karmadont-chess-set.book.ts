import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theWayOfTheShamanTheKarmadontChessSet = {
  id: "019db533-f38b-75b8-b6e5-3d889ac5d9ad",
  type: "page-type/book",
  slug: "the-way-of-the-shaman-the-karmadont-chess-set",
  title: "The Way of the Shaman: The Karmadont Chess Set",
  status: "completed",
  unit: "unit/words",
  position: 5,
  ownLength: 126250,
  ownProgress: 126250,
  publishedAt: "2017-04-02",
  partOfCollections: ["book-series/the-way-of-the-shaman"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B01MR50Z43",
      externalLink: "https://amazon.com/dp/B01MR50Z43",
    },
  ],
  createdAt: "2026-04-22T12:39:34.027Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
