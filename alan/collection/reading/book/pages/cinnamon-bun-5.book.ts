import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const cinnamonBun5 = {
  id: "019db533-f390-7bbd-ab9a-ae96ba1f5fac",
  type: "page-type/book",
  slug: "cinnamon-bun-5",
  title: "Cinnamon Bun 5",
  status: "not-started",
  author: "Laurie Gilmore",
  unit: "unit/words",
  position: 5,
  ownLength: 78500,
  publishedAt: "2023-05-30",
  partOfCollections: ["book-series/cinnamon-bun"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BQLHLD9R",
      externalLink: "https://amazon.com/dp/B0BQLHLD9R",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
