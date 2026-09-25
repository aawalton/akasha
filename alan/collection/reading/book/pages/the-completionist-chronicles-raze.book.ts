import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theCompletionistChroniclesRaze = {
  id: "019db533-f391-7854-9292-20aec2161422",
  type: "page-type/book",
  slug: "the-completionist-chronicles-raze",
  title: "The Completionist Chronicles: Raze",
  status: "completed",
  unit: "unit/words",
  position: 4,
  ownLength: 91250,
  ownProgress: 91250,
  publishedAt: "2022-09-16",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BFM9N2K2",
      externalLink: "https://amazon.com/dp/B0BFM9N2K2",
    },
  ],
} as const satisfies Book
