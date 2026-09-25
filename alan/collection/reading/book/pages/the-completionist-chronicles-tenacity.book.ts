import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theCompletionistChroniclesTenacity = {
  id: "019db533-f391-7833-bc42-64eae1ec9776",
  type: "page-type/book",
  slug: "the-completionist-chronicles-tenacity",
  title: "The Completionist Chronicles: Tenacity",
  status: "not-started",
  unit: "unit/words",
  position: 9,
  ownLength: 92000,
  publishedAt: "2023-10-03",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CGMJ78T6",
      externalLink: "https://amazon.com/dp/B0CGMJ78T6",
    },
  ],
} as const satisfies Book
