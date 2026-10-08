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
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
