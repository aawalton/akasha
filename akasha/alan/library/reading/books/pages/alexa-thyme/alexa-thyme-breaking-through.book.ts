import type { Book } from "../../book.page-type.ts"

export const alexaThymeBreakingThrough = {
  id: "019db533-f390-76c4-bd39-b7aed5585867",
  pageTypeSlug: "book",
  slug: "alexa-thyme-breaking-through",
  title: "Alexa Thyme: Breaking Through",
  kind: "read",
  status: "completed",
  author: "Lykanthropy",
  unitSlug: "words",
  position: 1,
  ownLength: 101250,
  ownProgress: 101250,
  publishedAt: "2023-12-20",
  partOfSlugs: ["book-series/alexa-thyme"],
  source: "kindle",
  externalId: "B0CQ4W3KH1",
  externalLink: "https://amazon.com/dp/B0CQ4W3KH1",
} as const satisfies Book
