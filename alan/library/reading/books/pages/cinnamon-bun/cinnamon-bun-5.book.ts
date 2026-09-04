import type { Book } from "../../book.page-type.ts"

export const cinnamonBun5 = {
  id: "019db533-f390-7bbd-ab9a-ae96ba1f5fac",
  pageTypeSlug: "book",
  slug: "cinnamon-bun-5",
  title: "Cinnamon Bun 5",
  status: "not-started",
  author: "Laurie Gilmore",
  unitSlug: "words",
  position: 5,
  ownLength: 78500,
  publishedAt: "2023-05-30",
  partOfSlugs: ["book-series/cinnamon-bun"],
  source: "kindle",
  externalId: "B0BQLHLD9R",
  externalLink: "https://amazon.com/dp/B0BQLHLD9R",
} as const satisfies Book
