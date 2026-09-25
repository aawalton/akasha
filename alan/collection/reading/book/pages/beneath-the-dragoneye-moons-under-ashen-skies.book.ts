import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const beneathTheDragoneyeMoonsUnderAshenSkies = {
  id: "019db533-f390-7964-b391-68cb406ef8d9",
  type: "page-type/book",
  slug: "beneath-the-dragoneye-moons-under-ashen-skies",
  title: "Beneath the Dragoneye Moons: Under Ashen Skies",
  status: "completed",
  author: "Selkie Myth",
  unit: "unit/words",
  position: 10,
  ownLength: 134750,
  ownProgress: 134750,
  publishedAt: "2025-01-16",
  partOfCollections: ["book-series/beneath-the-dragoneye-moons"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DT9YVW3S",
      externalLink: "https://amazon.com/dp/B0DT9YVW3S",
    },
  ],
} as const satisfies Book
