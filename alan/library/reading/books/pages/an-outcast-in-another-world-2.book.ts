import type { Book } from "../book.page-type.types.ts"

export const anOutcastInAnotherWorld2 = {
  id: "019db533-f390-7738-a1b3-b534dd245504",
  pageTypeSlug: "book",
  type: "book",
  slug: "an-outcast-in-another-world-2",
  title: "An Outcast In Another World 2",
  status: "completed",
  author: "Roger Portal",
  unit: "words",
  position: 2,
  ownLength: 138250,
  ownProgress: 138250,
  publishedAt: "2021-11-29",
  partOfCollections: ["book-series/an-outcast-in-another-world"],
  source: "kindle",
  externalId: "B09GBF187R",
  externalLink: "https://amazon.com/dp/B09GBF187R",
} as const satisfies Book
