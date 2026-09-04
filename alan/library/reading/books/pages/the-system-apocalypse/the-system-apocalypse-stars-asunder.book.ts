import type { Book } from "../../book.page-type.ts"

export const theSystemApocalypseStarsAsunder = {
  id: "019db533-f391-7ba7-8354-13d435e4d969",
  pageTypeSlug: "book",
  slug: "the-system-apocalypse-stars-asunder",
  title: "The System Apocalypse: Stars Asunder",
  status: "completed",
  author: "Tao Wong",
  unitSlug: "words",
  position: 9,
  ownLength: 118000,
  ownProgress: 118000,
  publishedAt: "2020-07-01",
  partOfSlugs: ["book-series/the-system-apocalypse"],
  source: "kindle",
  externalId: "B085HS8R2D",
  externalLink: "https://amazon.com/dp/B085HS8R2D",
} as const satisfies Book
