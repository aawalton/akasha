import type { Book } from "../../book.page-type.ts"

export const alexaThymeSuitingUp = {
  id: "019db533-f390-76a2-b0e4-f97a79575ac1",
  pageTypeSlug: "book",
  slug: "alexa-thyme-suiting-up",
  title: "Alexa Thyme: Suiting Up",
  kind: "read",
  status: "completed",
  author: "Lykanthropy",
  unitSlug: "words",
  position: 2,
  ownLength: 113000,
  ownProgress: 113000,
  publishedAt: "2024-04-27",
  partOfSlugs: ["book-series/alexa-thyme"],
  source: "kindle",
  externalId: "B0D2WPW5PS",
  externalLink: "https://amazon.com/dp/B0D2WPW5PS",
} as const satisfies Book
