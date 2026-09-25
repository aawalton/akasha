import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const melodyOfMana2 = {
  id: "019db533-f391-7294-b457-8881b81fe06f",
  type: "page-type/book",
  slug: "melody-of-mana-2",
  title: "Melody of Mana 2",
  status: "completed",
  unit: "unit/words",
  position: 2,
  ownLength: 86250,
  ownProgress: 86250,
  publishedAt: "2022-11-29",
  partOfCollections: ["book-series/melody-of-mana"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0B8PCLD8Y",
      externalLink: "https://amazon.com/dp/B0B8PCLD8Y",
    },
  ],
} as const satisfies Book
