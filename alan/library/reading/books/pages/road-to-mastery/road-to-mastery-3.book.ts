import type { Book } from "../../book.page-type.ts"

export const roadToMastery3 = {
  id: "019db533-f391-750d-a6d1-2aa3d2ab69c6",
  pageTypeSlug: "book",
  slug: "road-to-mastery-3",
  title: "Road to Mastery 3",
  status: "completed",
  author: "Wallace D. Wattles, Ruth L Miller, Patricia J. Crane, Rick Nichols",
  unitSlug: "words",
  position: 3,
  ownLength: 160500,
  ownProgress: 160500,
  publishedAt: "2024-01-30",
  partOfSlugs: ["book-series/road-to-mastery"],
  source: "kindle",
  externalId: "B0CFW1XHHP",
  externalLink: "https://amazon.com/dp/B0CFW1XHHP",
} as const satisfies Book
