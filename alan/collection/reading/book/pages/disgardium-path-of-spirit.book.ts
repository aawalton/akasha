import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const disgardiumPathOfSpirit = {
  id: "019db533-f390-7d97-a287-6a8dc598f914",
  type: "page-type/book",
  slug: "disgardium-path-of-spirit",
  title: "Disgardium: Path of Spirit",
  status: "not-started",
  unit: "unit/words",
  position: 6,
  ownLength: 128750,
  publishedAt: "2021-02-17",
  partOfCollections: ["book-series/disgardium"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08NZ2G98P",
      externalLink: "https://amazon.com/dp/B08NZ2G98P",
    },
  ],
} as const satisfies Book
