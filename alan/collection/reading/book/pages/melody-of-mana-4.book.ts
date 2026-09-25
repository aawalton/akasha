import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const melodyOfMana4 = {
  id: "019db533-f391-7285-a1bb-2c963c47de25",
  type: "page-type/book",
  slug: "melody-of-mana-4",
  title: "Melody of Mana 4",
  status: "completed",
  unit: "unit/words",
  position: 4,
  ownLength: 58750,
  ownProgress: 58750,
  publishedAt: "2023-11-28",
  partOfCollections: ["book-series/melody-of-mana"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CHMX635P",
      externalLink: "https://amazon.com/dp/B0CHMX635P",
    },
  ],
} as const satisfies Book
