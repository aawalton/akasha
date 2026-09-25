import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theCompletionistChroniclesInvent = {
  id: "019db533-f391-785f-a3c5-b4dc698e784c",
  type: "page-type/book",
  slug: "the-completionist-chronicles-invent",
  title: "The Completionist Chronicles: Invent",
  status: "not-started",
  unit: "unit/words",
  position: 7,
  ownLength: 94500,
  publishedAt: "2022-09-16",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BFM99ZKN",
      externalLink: "https://amazon.com/dp/B0BFM99ZKN",
    },
  ],
} as const satisfies Book
