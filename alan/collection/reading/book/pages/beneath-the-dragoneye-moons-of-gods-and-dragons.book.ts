import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const beneathTheDragoneyeMoonsOfGodsAndDragons = {
  id: "019db533-f390-791d-a236-353402b57536",
  type: "page-type/book",
  slug: "beneath-the-dragoneye-moons-of-gods-and-dragons",
  title: "Beneath the Dragoneye Moons: Of Gods and Dragons",
  status: "completed",
  unit: "unit/words",
  position: 16,
  ownLength: 84500,
  ownProgress: 84500,
  publishedAt: "2025-09-08",
  partOfCollections: ["book-series/beneath-the-dragoneye-moons"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0FF3MQ8NL",
      externalLink: "https://amazon.com/dp/B0FF3MQ8NL",
    },
  ],
} as const satisfies Book
