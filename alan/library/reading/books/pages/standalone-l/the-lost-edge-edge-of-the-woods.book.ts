import type { Book } from "../../book.page-type.ts"

export const theLostEdgeEdgeOfTheWoods = {
  id: "019db533-f38a-73c5-a6fe-2b1065785b97",
  pageTypeSlug: "book",
  slug: "the-lost-edge-edge-of-the-woods",
  title: "The Lost Edge: Edge of the Woods",
  status: "not-started",
  author: "William Shakespeare",
  unitSlug: "words",
  position: 1,
  ownLength: 136250,
  publishedAt: "2023-09-12",
  source: "kindle",
  externalId: "B0C6V3BCV7",
  externalLink: "https://amazon.com/dp/B0C6V3BCV7",
} as const satisfies Book
