import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const somniaOnlineSynergy = {
  id: "019db533-f391-7642-92ed-5c85644048c9",
  type: "page-type/book",
  slug: "somnia-online-synergy",
  title: "Somnia Online: Synergy",
  status: "completed",
  unit: "unit/words",
  position: 7,
  ownLength: 89500,
  ownProgress: 89500,
  publishedAt: "2020-11-12",
  partOfCollections: ["book-series/somnia-online"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08MTKN7BG",
      externalLink: "https://amazon.com/dp/B08MTKN7BG",
    },
  ],
} as const satisfies Book
