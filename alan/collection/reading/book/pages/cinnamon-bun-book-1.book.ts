import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const cinnamonBunBook1 = {
  id: "019db533-f390-7bd7-86a1-3ce90b64f679",
  type: "page-type/book",
  slug: "cinnamon-bun-book-1",
  title: "Cinnamon Bun",
  status: "not-started",
  author: "Ravens Dagger",
  unit: "unit/words",
  position: 1,
  ownLength: 106000,
  publishedAt: "2020-06-28",
  partOfCollections: ["book-series/cinnamon-bun"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08BZ2NW67",
      externalLink: "https://amazon.com/dp/B08BZ2NW67",
    },
  ],
} as const satisfies Book
