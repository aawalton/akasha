import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const azarinthHealer3 = {
  id: "019db533-f390-78d0-8016-60d12acbce20",
  type: "page-type/book",
  slug: "azarinth-healer-3",
  title: "Azarinth Healer 3",
  status: "completed",
  unit: "unit/words",
  position: 3,
  ownLength: 194000,
  ownProgress: 194000,
  publishedAt: "2023-12-11",
  partOfCollections: ["book-series/azarinth-healer"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CNNYXRFW",
      externalLink: "https://amazon.com/dp/B0CNNYXRFW",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
