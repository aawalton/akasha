import type { Book } from "../../book.page-type.ts"

export const roadToMasteryBook1 = {
  id: "019db533-f391-753b-9683-4df239dd755d",
  pageTypeSlug: "book",
  slug: "road-to-mastery-book-1",
  title: "Road to Mastery",
  status: "completed",
  author: "Tony Annesi",
  unitSlug: "words",
  position: 1,
  ownLength: 184000,
  ownProgress: 184000,
  publishedAt: "2023-05-30",
  partOfSlugs: ["book-series/road-to-mastery"],
  source: "kindle",
  externalId: "B0BW9X6H59",
  externalLink: "https://amazon.com/dp/B0BW9X6H59",
} as const satisfies Book
