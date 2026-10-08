import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theConnectedSystemWarbreakersRise = {
  id: "019db533-f391-78db-88be-69d97f182861",
  type: "page-type/book",
  slug: "the-connected-system-warbreakers-rise",
  title: "The Connected System: Warbreaker's Rise",
  status: "not-started",
  unit: "unit/words",
  position: 1,
  ownLength: 161000,
  publishedAt: "2024-03-05",
  partOfCollections: ["book-series/the-connected-system"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CL9RV9GB",
      externalLink: "https://amazon.com/dp/B0CL9RV9GB",
    },
  ],
  createdAt: "2026-04-22T12:39:34.033Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
