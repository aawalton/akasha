import type { Book } from "../../book.page-type.ts"

export const discworldTheFifthElephant = {
  id: "019db533-f388-7e69-bf74-99838491500b",
  pageTypeSlug: "book",
  slug: "discworld-the-fifth-elephant",
  title: "Discworld: The Fifth Elephant",
  status: "not-started",
  author: "Terry Pratchett",
  unitSlug: "words",
  position: 24,
  ownLength: 104500,
  publishedAt: "2009-10-13",
  source: "kindle",
  externalId: "B000W5MI9E",
  externalLink: "https://www.amazon.com/gp/product/B000W5MI9E",
} as const satisfies Book
