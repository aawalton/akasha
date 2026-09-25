import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const salvosThePlaguelands = {
  id: "019db533-f391-75f2-bc7c-2d16bf4e0030",
  type: "page-type/book",
  slug: "salvos-the-plaguelands",
  title: "Salvos: The Plaguelands",
  status: "not-started",
  unit: "unit/words",
  position: 3,
  ownLength: 180750,
  publishedAt: "2021-08-01",
  partOfCollections: ["book-series/salvos"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B098D3HJST",
      externalLink: "https://amazon.com/dp/B098D3HJST",
    },
  ],
} as const satisfies Book
