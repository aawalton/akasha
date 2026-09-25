import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const markOfTheFool3 = {
  id: "019db533-f391-7217-847e-341218f1e873",
  type: "page-type/book",
  slug: "mark-of-the-fool-3",
  title: "Mark of the Fool 3",
  status: "completed",
  author: "Jim Butcher, Mark Powers, Chase Conley, Tyler Walpole, James Marsters",
  unit: "unit/words",
  position: 3,
  ownLength: 181500,
  ownProgress: 181500,
  publishedAt: "2023-04-12",
  partOfCollections: ["book-series/mark-of-the-fool"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0BRJRD65K",
      externalLink: "https://amazon.com/dp/B0BRJRD65K",
    },
  ],
} as const satisfies Book
