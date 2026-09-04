import type { Book } from "../../book.page-type.ts"

export const theSystemApocalypseForbiddenZone = {
  id: "019db533-f391-7b74-97b2-5e4c9e66233d",
  pageTypeSlug: "book",
  slug: "the-system-apocalypse-forbidden-zone",
  title: "The System Apocalypse: Forbidden Zone",
  status: "completed",
  unitSlug: "words",
  position: 11,
  ownLength: 107500,
  ownProgress: 107500,
  publishedAt: "2021-09-01",
  partOfSlugs: ["book-series/the-system-apocalypse"],
  source: "kindle",
  externalId: "B09B84Y15P",
  externalLink: "https://amazon.com/dp/B09B84Y15P",
} as const satisfies Book
