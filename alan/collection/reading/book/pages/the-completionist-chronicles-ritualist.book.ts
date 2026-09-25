import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theCompletionistChroniclesRitualist = {
  id: "019db533-f391-788c-ac3c-93a26cf35f16",
  type: "page-type/book",
  slug: "the-completionist-chronicles-ritualist",
  title: "The Completionist Chronicles: Ritualist",
  status: "completed",
  unit: "unit/words",
  position: 1,
  ownLength: 87500,
  ownProgress: 87500,
  publishedAt: "2022-09-16",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BFMB1X6Y",
      externalLink: "https://amazon.com/dp/B0BFMB1X6Y",
    },
  ],
} as const satisfies Book
