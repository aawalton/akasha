import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const worldTreeTrilogyDemonLords = {
  id: "019db533-f38b-75ee-940a-a7e192131935",
  type: "page-type/book",
  slug: "world-tree-trilogy-demon-lords",
  title: "World-Tree Trilogy: Demon Lords",
  status: "completed",
  unit: "unit/words",
  position: 2,
  ownLength: 109750,
  ownProgress: 109750,
  publishedAt: "2019-02-07",
  partOfCollections: ["book-series/world-tree-trilogy"],
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07NHLQP7F",
      externalLink: "https://amazon.com/dp/B07NHLQP7F",
    },
  ],
} as const satisfies Book
