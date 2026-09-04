import type { Book } from "../../book.page-type.ts"

export const theSystemApocalypseCoastOnFire = {
  id: "019db533-f391-7bbf-a963-8886cc91eb11",
  pageTypeSlug: "book",
  slug: "the-system-apocalypse-coast-on-fire",
  title: "The System Apocalypse: Coast on Fire",
  status: "completed",
  unitSlug: "words",
  position: 5,
  ownLength: 94500,
  ownProgress: 94500,
  publishedAt: "2018-09-01",
  partOfSlugs: ["book-series/the-system-apocalypse"],
  source: "kindle",
  externalId: "B07GT69BBL",
  externalLink: "https://amazon.com/dp/B07GT69BBL",
} as const satisfies Book
