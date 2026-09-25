import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const alteredRealmsAscension = {
  id: "019db533-f390-76d0-a4ef-6d553e4f354f",
  type: "page-type/book",
  slug: "altered-realms-ascension",
  title: "Altered Realms: Ascension",
  status: "not-started",
  author: "B. F. Rockriver",
  unit: "unit/words",
  position: 1,
  ownLength: 139250,
  publishedAt: "2020-04-28",
  partOfCollections: ["book-series/altered-realms"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B087TDNRSF",
      externalLink: "https://amazon.com/dp/B087TDNRSF",
    },
  ],
} as const satisfies Book
