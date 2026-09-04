import type { Book } from "../../book.page-type.ts"

export const theSystemApocalypseTheCostOfSurvival = {
  id: "019db533-f391-7bf2-bc8b-9b7774bb7258",
  pageTypeSlug: "book",
  slug: "the-system-apocalypse-the-cost-of-survival",
  title: "The System Apocalypse: The Cost of Survival",
  status: "completed",
  author: "Tao Wong",
  unitSlug: "words",
  position: 3,
  ownLength: 75750,
  ownProgress: 75750,
  publishedAt: "2018-01-24",
  partOfSlugs: ["book-series/the-system-apocalypse"],
  source: "kindle",
  externalId: "B079B7B4GP",
  externalLink: "https://amazon.com/dp/B079B7B4GP",
} as const satisfies Book
