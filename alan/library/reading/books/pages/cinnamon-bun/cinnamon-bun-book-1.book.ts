import type { Book } from "../../book.page-type.ts"

export const cinnamonBunBook1 = {
  id: "019db533-f390-7bd7-86a1-3ce90b64f679",
  pageTypeSlug: "book",
  slug: "cinnamon-bun-book-1",
  title: "Cinnamon Bun",
  status: "not-started",
  author: "Ravens Dagger",
  unitSlug: "words",
  position: 1,
  ownLength: 106000,
  publishedAt: "2020-06-28",
  partOfSlugs: ["book-series/cinnamon-bun"],
  source: "kindle",
  externalId: "B08BZ2NW67",
  externalLink: "https://amazon.com/dp/B08BZ2NW67",
} as const satisfies Book
