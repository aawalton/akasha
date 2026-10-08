import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const beneathTheDragoneyeMoonsBeyondTheWall = {
  id: "019db533-f390-79ae-8ba3-a74019313fe1",
  type: "page-type/book",
  slug: "beneath-the-dragoneye-moons-beyond-the-wall",
  title: "Beneath the Dragoneye Moons: Beyond the Wall",
  status: "completed",
  unit: "unit/words",
  position: 4,
  ownLength: 155500,
  ownProgress: 155500,
  publishedAt: "2025-01-16",
  partOfCollections: ["book-series/beneath-the-dragoneye-moons"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DT7Q3N57",
      externalLink: "https://amazon.com/dp/B0DT7Q3N57",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
