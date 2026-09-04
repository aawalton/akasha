import type { Book } from "../../book.page-type.ts"

export const disgardiumOutOfPlay = {
  id: "019db533-f390-7d83-9613-6512bbdb2426",
  pageTypeSlug: "book",
  slug: "disgardium-out-of-play",
  title: "Disgardium: Out of Play",
  status: "not-started",
  unitSlug: "words",
  position: 11,
  ownLength: 137750,
  publishedAt: "2022-07-27",
  partOfSlugs: ["book-series/disgardium"],
  source: "kindle",
  externalId: "B0B3S67XR4",
  externalLink: "https://amazon.com/dp/B0B3S67XR4",
} as const satisfies Book
