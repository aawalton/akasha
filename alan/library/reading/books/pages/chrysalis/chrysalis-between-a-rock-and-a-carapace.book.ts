import type { Book } from "../../book.page-type.ts"

export const chrysalisBetweenARockAndACarapace = {
  id: "019db533-f390-7ad5-a54d-b4963cf11543",
  pageTypeSlug: "book",
  slug: "chrysalis-between-a-rock-and-a-carapace",
  title: "Chrysalis: Between a Rock and a Carapace",
  kind: "read",
  status: "completed",
  unitSlug: "words",
  position: 4,
  ownLength: 171000,
  ownProgress: 171000,
  publishedAt: "2023-06-20",
  partOfSlugs: ["book-series/chrysalis"],
  source: "kindle",
  externalId: "B0BQZ8VN57",
  externalLink: "https://amazon.com/dp/B0BQZ8VN57",
} as const satisfies Book
