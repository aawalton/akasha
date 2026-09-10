import type { Book } from "../book.page-type.types.ts"

export const theLegendaryFool = {
  id: "019db533-f391-7a02-a0f7-6913843a7c82",
  pageTypeSlug: "book",
  type: "book",
  slug: "the-legendary-fool",
  title: "The Legendary Fool",
  status: "not-started",
  author: "Daisy Meadows",
  unit: "words",
  position: 1,
  ownLength: 106000,
  publishedAt: "2025-04-01",
  source: "kindle",
  externalId: "B0DHLNL26F",
  externalLink: "https://amazon.com/dp/B0DHLNL26F",
} as const satisfies Book
