import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const beneathTheDragoneyeMoonsMoonfall = {
  id: "019db533-f390-794a-b69c-03219cd0834a",
  type: "page-type/book",
  slug: "beneath-the-dragoneye-moons-moonfall",
  title: "Beneath the Dragoneye Moons: Moonfall",
  status: "completed",
  unit: "unit/words",
  position: 13,
  ownLength: 69750,
  ownProgress: 69750,
  publishedAt: "2025-01-16",
  partOfCollections: ["book-series/beneath-the-dragoneye-moons"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DT7TF72Q",
      externalLink: "https://amazon.com/dp/B0DT7TF72Q",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
