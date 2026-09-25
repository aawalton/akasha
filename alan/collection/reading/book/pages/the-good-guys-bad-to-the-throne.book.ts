import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theGoodGuysBadToTheThrone = {
  id: "019db533-f391-7915-9403-f6ffef6b3e03",
  type: "page-type/book",
  slug: "the-good-guys-bad-to-the-throne",
  title: "The Good Guys: Bad to the Throne",
  status: "not-started",
  author: "SuperSummary",
  unit: "unit/words",
  position: 15,
  ownLength: 145000,
  publishedAt: "2024-06-08",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0C3NFX3CY",
      externalLink: "https://amazon.com/dp/B0C3NFX3CY",
    },
  ],
} as const satisfies Book
