import type { Book } from "../../book.page-type.ts"

export const somniaOnlineFusion = {
  id: "019db533-f391-7636-a343-f2395ea89f86",
  pageTypeSlug: "book",
  slug: "somnia-online-fusion",
  title: "Somnia Online: Fusion",
  kind: "read",
  status: "completed",
  unitSlug: "words",
  position: 6,
  ownLength: 106500,
  ownProgress: 106500,
  publishedAt: "2020-04-14",
  partOfSlugs: ["book-series/somnia-online"],
  source: "kindle",
  externalId: "B086TW144S",
  externalLink: "https://amazon.com/dp/B086TW144S",
} as const satisfies Book
