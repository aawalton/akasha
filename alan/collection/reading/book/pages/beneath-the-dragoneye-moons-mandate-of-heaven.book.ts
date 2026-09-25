import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const beneathTheDragoneyeMoonsMandateOfHeaven = {
  id: "019db533-f390-797b-b732-cbdd577487cc",
  type: "page-type/book",
  slug: "beneath-the-dragoneye-moons-mandate-of-heaven",
  title: "Beneath the Dragoneye Moons: Mandate of Heaven",
  status: "completed",
  author: "Selkie Myth",
  unit: "unit/words",
  position: 11,
  ownLength: 204250,
  ownProgress: 204250,
  publishedAt: "2025-01-20",
  partOfCollections: ["book-series/beneath-the-dragoneye-moons"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DTHMP58R",
      externalLink: "https://amazon.com/dp/B0DTHMP58R",
    },
  ],
} as const satisfies Book
