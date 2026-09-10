import type { Book } from "../book.page-type.types.ts"

export const chaosSeedsFounding = {
  id: "019db533-f390-7ab3-ab76-bf813e1a7fac",
  pageTypeSlug: "book",
  type: "book",
  slug: "chaos-seeds-founding",
  title: "Chaos Seeds: Founding",
  status: "completed",
  rank: "B",
  author: "Aleron Kong",
  unit: "words",
  position: 1,
  ownLength: 73750,
  ownProgress: 73750,
  publishedAt: "2015-11-20",
  partOfCollections: ["book-series/chaos-seeds"],
  source: "kindle",
  externalId: "B0172GEB68",
  externalLink: "https://amazon.com/dp/B0172GEB68",
} as const satisfies Book
