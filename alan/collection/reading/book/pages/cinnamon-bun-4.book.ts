import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const cinnamonBun4 = {
  id: "019db533-f390-7bab-bfcc-d27185f72353",
  type: "page-type/book",
  slug: "cinnamon-bun-4",
  title: "Cinnamon Bun 4",
  status: "not-started",
  unit: "unit/words",
  position: 4,
  ownLength: 78000,
  publishedAt: "2022-12-20",
  partOfCollections: ["book-series/cinnamon-bun"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BK26CB6B",
      externalLink: "https://amazon.com/dp/B0BK26CB6B",
    },
  ],
} as const satisfies Book
