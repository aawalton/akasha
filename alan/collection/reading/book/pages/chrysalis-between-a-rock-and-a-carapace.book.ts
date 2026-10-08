import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const chrysalisBetweenARockAndACarapace = {
  id: "019db533-f390-7ad5-a54d-b4963cf11543",
  type: "page-type/book",
  slug: "chrysalis-between-a-rock-and-a-carapace",
  title: "Chrysalis: Between a Rock and a Carapace",
  status: "completed",
  unit: "unit/words",
  position: 4,
  ownLength: 171000,
  ownProgress: 171000,
  publishedAt: "2023-06-20",
  partOfCollections: ["book-series/chrysalis"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BQZ8VN57",
      externalLink: "https://amazon.com/dp/B0BQZ8VN57",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
