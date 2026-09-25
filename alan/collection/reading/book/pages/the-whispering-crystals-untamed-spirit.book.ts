import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theWhisperingCrystalsUntamedSpirit = {
  id: "019db533-f38b-758c-809f-69b48c825f01",
  type: "page-type/book",
  slug: "the-whispering-crystals-untamed-spirit",
  title: "The Whispering Crystals: Untamed Spirit",
  status: "completed",
  unit: "unit/words",
  position: 5,
  ownLength: 128000,
  ownProgress: 128000,
  publishedAt: "2023-03-02",
  partOfCollections: ["book-series/the-whispering-crystals"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BX1TZ2TD",
      externalLink: "https://amazon.com/dp/B0BX1TZ2TD",
    },
  ],
} as const satisfies Book
