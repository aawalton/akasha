import type { Book } from "../book.page-type.ts"

export const disgardiumTheDestroyingPlague = {
  id: "019db533-f390-7dc6-8551-aaeb6cd810cc",
  pageTypeSlug: "book",
  type: "book",
  slug: "disgardium-the-destroying-plague",
  title: "Disgardium: The Destroying Plague",
  status: "completed",
  unit: "words",
  position: 3,
  ownLength: 128750,
  ownProgress: 128750,
  publishedAt: "2020-01-09",
  partOfCollections: ["book-series/disgardium"],
  source: "kindle",
  externalId: "B07ZPB3BV6",
  externalLink: "https://amazon.com/dp/B07ZPB3BV6",
} as const satisfies Book
