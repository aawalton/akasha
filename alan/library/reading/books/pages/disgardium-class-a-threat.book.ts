import type { Book } from "../book.page-type.types.ts"

export const disgardiumClassAThreat = {
  id: "019db533-f390-7dbe-a698-1bd76c55ed7f",
  pageTypeSlug: "book",
  type: "book",
  slug: "disgardium-class-a-threat",
  title: "Disgardium: Class-A Threat",
  status: "completed",
  unit: "words",
  position: 1,
  ownLength: 129250,
  ownProgress: 129250,
  publishedAt: "2019-04-22",
  partOfCollections: ["book-series/disgardium"],
  source: "kindle",
  externalId: "B07N33S8C6",
  externalLink: "https://amazon.com/dp/B07N33S8C6",
} as const satisfies Book
