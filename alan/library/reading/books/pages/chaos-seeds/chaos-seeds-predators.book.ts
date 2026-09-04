import type { Book } from "../../book.page-type.ts"

export const chaosSeedsPredators = {
  id: "019db533-f390-7a83-891f-3a1ee827b7fd",
  pageTypeSlug: "book",
  slug: "chaos-seeds-predators",
  title: "Chaos Seeds: Predators",
  kind: "read",
  status: "completed",
  rank: "C",
  unitSlug: "words",
  position: 7,
  ownLength: 354750,
  ownProgress: 354750,
  publishedAt: "2018-02-16",
  partOfSlugs: ["book-series/chaos-seeds"],
  source: "kindle",
  externalId: "B079WCFZB8",
  externalLink: "https://amazon.com/dp/B079WCFZB8",
} as const satisfies Book
