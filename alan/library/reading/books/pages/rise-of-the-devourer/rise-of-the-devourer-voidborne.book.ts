import type { Book } from "../../book.page-type.ts"

export const riseOfTheDevourerVoidborne = {
  id: "019db533-f391-74e3-8fb3-b22bd0f46a88",
  pageTypeSlug: "book",
  slug: "rise-of-the-devourer-voidborne",
  title: "Rise of the Devourer: Voidborne",
  status: "not-started",
  unitSlug: "words",
  position: 1,
  ownLength: 123000,
  publishedAt: "2023-10-24",
  partOfSlugs: ["book-series/rise-of-the-devourer"],
  source: "kindle",
  externalId: "B0CFG59XP9",
  externalLink: "https://amazon.com/dp/B0CFG59XP9",
} as const satisfies Book
