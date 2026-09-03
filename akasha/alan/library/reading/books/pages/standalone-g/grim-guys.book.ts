import type { Book } from "../../book.page-type.ts"

export const grimGuys = {
  id: "019db533-f38a-7391-aed4-d98f82114120",
  pageTypeSlug: "book",
  slug: "grim-guys",
  title: "Grim Guys",
  kind: "read",
  status: "not-started",
  author: "Darynda Jones",
  unitSlug: "words",
  position: 1,
  ownLength: 105500,
  publishedAt: "2024-12-01",
  source: "kindle",
  externalId: "B0DPGB8214",
  externalLink: "https://amazon.com/dp/B0DPGB8214",
} as const satisfies Book
