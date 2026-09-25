import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theWhisperingCrystalsUnchainedPotential = {
  id: "019db533-f38b-7584-bb90-88a8f3b478f9",
  type: "page-type/book",
  slug: "the-whispering-crystals-unchained-potential",
  title: "The Whispering Crystals: Unchained Potential",
  status: "completed",
  unit: "unit/words",
  position: 4,
  ownLength: 91250,
  ownProgress: 91250,
  publishedAt: "2022-06-04",
  partOfCollections: ["book-series/the-whispering-crystals"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B09ZRJPB8J",
      externalLink: "https://amazon.com/dp/B09ZRJPB8J",
    },
  ],
} as const satisfies Book
