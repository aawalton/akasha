import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const beneathTheDragoneyeMoonsReturnToRemus = {
  id: "019db533-f390-79c6-b723-9345e3dbce98",
  type: "page-type/book",
  slug: "beneath-the-dragoneye-moons-return-to-remus",
  title: "Beneath the Dragoneye Moons: Return to Remus",
  status: "completed",
  unit: "unit/words",
  position: 7,
  ownLength: 121500,
  ownProgress: 121500,
  publishedAt: "2025-01-20",
  partOfCollections: ["book-series/beneath-the-dragoneye-moons"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DTKFTVYF",
      externalLink: "https://amazon.com/dp/B0DTKFTVYF",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
