import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const cinnamonBun3 = {
  id: "019db533-f390-7bc7-ab22-e83f6b05b305",
  type: "page-type/book",
  slug: "cinnamon-bun-3",
  title: "Cinnamon Bun 3",
  status: "not-started",
  author: "Laurie Gilmore",
  unit: "unit/words",
  position: 3,
  ownLength: 117750,
  publishedAt: "2021-09-14",
  partOfCollections: ["book-series/cinnamon-bun"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09DGSHPJ8",
      externalLink: "https://amazon.com/dp/B09DGSHPJ8",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
