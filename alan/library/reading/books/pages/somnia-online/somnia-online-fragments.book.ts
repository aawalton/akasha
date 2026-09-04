import type { Book } from "../../book.page-type.ts"

export const somniaOnlineFragments = {
  id: "019db533-f391-764b-bbfb-9769905eb029",
  pageTypeSlug: "book",
  slug: "somnia-online-fragments",
  title: "Somnia Online: Fragments",
  status: "completed",
  unitSlug: "words",
  position: 3,
  ownLength: 88750,
  ownProgress: 88750,
  publishedAt: "2018-11-09",
  partOfSlugs: ["book-series/somnia-online"],
  source: "kindle",
  externalId: "B07KCZ7HN3",
  externalLink: "https://amazon.com/dp/B07KCZ7HN3",
} as const satisfies Book
