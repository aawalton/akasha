import type { Book } from "../book.page-type.ts"

export const cinnamonBun6 = {
  id: "019db533-f390-7b9b-a88a-e2ec13a279e4",
  pageTypeSlug: "book",
  type: "book",
  slug: "cinnamon-bun-6",
  title: "Cinnamon Bun 6",
  status: "not-started",
  author: "Sara B.",
  unit: "words",
  position: 6,
  ownLength: 80250,
  publishedAt: "2025-06-24",
  partOfCollections: ["book-series/cinnamon-bun"],
  source: "kindle",
  externalId: "B0F63VD29W",
  externalLink: "https://amazon.com/dp/B0F63VD29W",
} as const satisfies Book
