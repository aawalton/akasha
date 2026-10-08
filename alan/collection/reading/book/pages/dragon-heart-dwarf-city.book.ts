import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const dragonHeartDwarfCity = {
  id: "019db533-f390-7e05-bf3d-c5549aaca910",
  type: "page-type/book",
  slug: "dragon-heart-dwarf-city",
  title: "Dragon Heart: Dwarf City",
  status: "completed",
  unit: "unit/words",
  position: 14,
  ownLength: 102250,
  ownProgress: 102250,
  publishedAt: "2022-03-05",
  partOfCollections: ["book-series/dragon-heart"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09MQZYN75",
      externalLink: "https://amazon.com/dp/B09MQZYN75",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
