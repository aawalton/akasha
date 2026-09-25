import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const salvosTheChildMonster = {
  id: "019db533-f391-757f-b999-9cb04cc8f008",
  type: "page-type/book",
  slug: "salvos-the-child-monster",
  title: "Salvos: The Child Monster",
  status: "not-started",
  unit: "unit/words",
  position: 12,
  ownLength: 114000,
  publishedAt: "2024-04-02",
  partOfCollections: ["book-series/salvos"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CM825NXK",
      externalLink: "https://amazon.com/dp/B0CM825NXK",
    },
  ],
} as const satisfies Book
