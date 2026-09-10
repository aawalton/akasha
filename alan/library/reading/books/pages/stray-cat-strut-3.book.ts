import type { Book } from "../book.page-type.types.ts"

export const strayCatStrut3 = {
  id: "019db533-f391-76d1-ba3d-00815c8940ff",
  pageTypeSlug: "book",
  type: "book",
  slug: "stray-cat-strut-3",
  title: "Stray Cat Strut 3",
  status: "not-started",
  author: "RavensDagger",
  unit: "words",
  position: 3,
  ownLength: 75750,
  publishedAt: "2023-02-21",
  source: "kindle",
  externalId: "B0BKH3TLNL",
  externalLink: "https://amazon.com/dp/B0BKH3TLNL",
} as const satisfies Book
