import type { Book } from "../book.page-type.types.ts"

export const disgardiumApostleOfTheSleepingGods = {
  id: "019db533-f390-7dce-9613-098be15c6684",
  pageTypeSlug: "book",
  type: "book",
  slug: "disgardium-apostle-of-the-sleeping-gods",
  title: "Disgardium: Apostle of the Sleeping Gods",
  status: "completed",
  unit: "words",
  position: 2,
  ownLength: 141250,
  ownProgress: 141250,
  publishedAt: "2019-06-10",
  partOfCollections: ["book-series/disgardium"],
  source: "kindle",
  externalId: "B07Q15DWNC",
  externalLink: "https://amazon.com/dp/B07Q15DWNC",
} as const satisfies Book
