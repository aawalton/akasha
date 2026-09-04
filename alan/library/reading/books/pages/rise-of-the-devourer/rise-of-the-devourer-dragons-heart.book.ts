import type { Book } from "../../book.page-type.ts"

export const riseOfTheDevourerDragonsHeart = {
  id: "019db533-f391-74b5-bc94-1deecd202eeb",
  pageTypeSlug: "book",
  slug: "rise-of-the-devourer-dragons-heart",
  title: "Rise of the Devourer: Dragon's Heart",
  kind: "read",
  status: "not-started",
  unitSlug: "words",
  position: 4,
  ownLength: 102000,
  publishedAt: "2025-07-23",
  partOfSlugs: ["book-series/rise-of-the-devourer"],
  source: "kindle",
  externalId: "B0D8487C8L",
  externalLink: "https://amazon.com/dp/B0D8487C8L",
} as const satisfies Book
