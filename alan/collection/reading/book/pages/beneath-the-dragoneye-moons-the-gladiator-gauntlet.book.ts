import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const beneathTheDragoneyeMoonsTheGladiatorGauntlet = {
  id: "019db533-f390-7997-bb57-cb72d6f15218",
  type: "page-type/book",
  slug: "beneath-the-dragoneye-moons-the-gladiator-gauntlet",
  title: "Beneath the Dragoneye Moons: The Gladiator Gauntlet",
  status: "completed",
  author: "Selkie Myth",
  unit: "unit/words",
  position: 9,
  ownLength: 104750,
  ownProgress: 104750,
  publishedAt: "2025-01-20",
  partOfCollections: ["book-series/beneath-the-dragoneye-moons"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DTJN6S5T",
      externalLink: "https://amazon.com/dp/B0DTJN6S5T",
    },
  ],
} as const satisfies Book
