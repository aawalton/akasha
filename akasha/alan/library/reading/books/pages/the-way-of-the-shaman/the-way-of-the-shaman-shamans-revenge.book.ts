import type { Book } from "../../book.page-type.ts"

export const theWayOfTheShamanShamansRevenge = {
  id: "019db533-f38b-75c1-b4db-bb9a4beffcf9",
  pageTypeSlug: "book",
  slug: "the-way-of-the-shaman-shamans-revenge",
  title: "The Way of the Shaman: Shaman's Revenge",
  kind: "read",
  status: "completed",
  unitSlug: "words",
  position: 6,
  ownLength: 140250,
  ownProgress: 140250,
  publishedAt: "2017-08-20",
  partOfSlugs: ["book-series/the-way-of-the-shaman"],
  source: "kindle",
  externalId: "B074V8YB1M",
  externalLink: "https://amazon.com/dp/B074V8YB1M",
} as const satisfies Book
