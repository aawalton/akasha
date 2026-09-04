import type { Book } from "../../book.page-type.ts"

export const cradleSkysworn = {
  id: "019db533-f390-7c5f-a348-3a683cb3d42a",
  pageTypeSlug: "book",
  slug: "cradle-skysworn",
  title: "Cradle: Skysworn",
  kind: "read",
  status: "completed",
  author: "Will Wight",
  unitSlug: "words",
  position: 4,
  ownLength: 81000,
  ownProgress: 81000,
  publishedAt: "2017-09-30",
  partOfSlugs: ["book-series/cradle"],
  source: "kindle",
  externalId: "B0762YQ2H8",
  externalLink: "https://amazon.com/dp/B0762YQ2H8",
} as const satisfies Book
