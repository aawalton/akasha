import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const chrysalisUppingTheAnte = {
  id: "019db533-f390-7abb-8188-29e45d87a598",
  type: "page-type/book",
  slug: "chrysalis-upping-the-ante",
  title: "Chrysalis: Upping the Ante",
  status: "completed",
  unit: "unit/words",
  position: 2,
  ownLength: 177000,
  ownProgress: 177000,
  publishedAt: "2022-09-06",
  partOfCollections: ["book-series/chrysalis"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0B2CF85JC",
      externalLink: "https://amazon.com/dp/B0B2CF85JC",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
