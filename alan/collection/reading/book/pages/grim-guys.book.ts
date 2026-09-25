import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const grimGuys = {
  id: "019db533-f38a-7391-aed4-d98f82114120",
  type: "page-type/book",
  slug: "grim-guys",
  title: "Grim Guys",
  status: "not-started",
  author: "Darynda Jones",
  unit: "unit/words",
  position: 1,
  ownLength: 105500,
  publishedAt: "2024-12-01",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DPGB8214",
      externalLink: "https://amazon.com/dp/B0DPGB8214",
    },
  ],
} as const satisfies Book
