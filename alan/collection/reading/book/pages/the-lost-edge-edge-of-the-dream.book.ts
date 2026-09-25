import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theLostEdgeEdgeOfTheDream = {
  id: "019db533-f388-7674-baa0-ea9668492555",
  type: "page-type/book",
  slug: "the-lost-edge-edge-of-the-dream",
  title: "The Lost Edge: Edge of the Dream",
  status: "not-started",
  author: "William Shakespeare",
  unit: "unit/words",
  position: 2,
  ownLength: 112500,
  publishedAt: "2025-11-25",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0FBHNGV8J",
      externalLink: "https://amazon.com/dp/B0FBHNGV8J",
    },
  ],
} as const satisfies Book
