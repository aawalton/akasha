import type { Book } from "../../book.page-type.ts"

export const roadToMastery5 = {
  id: "019db533-f391-7519-99fb-f2350dfee42f",
  pageTypeSlug: "book",
  slug: "road-to-mastery-5",
  title: "Road to Mastery 5",
  status: "completed",
  author: "Valerios",
  unitSlug: "words",
  position: 5,
  ownLength: 138000,
  ownProgress: 138000,
  publishedAt: "2024-10-09",
  partOfSlugs: ["book-series/road-to-mastery"],
  source: "kindle",
  externalId: "B0D6GP6GQ4",
  externalLink: "https://amazon.com/dp/B0D6GP6GQ4",
} as const satisfies Book
