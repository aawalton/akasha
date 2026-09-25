import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theCompletionistChroniclesInflame = {
  id: "019db533-f391-7883-ad28-6deb74420061",
  type: "page-type/book",
  slug: "the-completionist-chronicles-inflame",
  title: "The Completionist Chronicles: Inflame",
  status: "not-started",
  unit: "unit/words",
  position: 6,
  ownLength: 98500,
  publishedAt: "2022-09-16",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BFN9WNJY",
      externalLink: "https://amazon.com/dp/B0BFN9WNJY",
    },
  ],
} as const satisfies Book
