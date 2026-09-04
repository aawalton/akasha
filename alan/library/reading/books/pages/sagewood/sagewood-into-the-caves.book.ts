import type { Book } from "../../book.page-type.ts"

export const sagewoodIntoTheCaves = {
  id: "019db533-f391-755d-9264-955d82c8c139",
  pageTypeSlug: "book",
  slug: "sagewood-into-the-caves",
  title: "Sagewood: Into the Caves",
  status: "not-started",
  unitSlug: "words",
  position: 2,
  ownLength: 99000,
  publishedAt: "2024-09-04",
  partOfSlugs: ["book-series/sagewood"],
  source: "kindle",
  externalId: "B0D5J34DKD",
  externalLink: "https://amazon.com/dp/B0D5J34DKD",
} as const satisfies Book
