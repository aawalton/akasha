import type { Book } from "../../book.page-type.ts"

export const cinnamonBun2 = {
  id: "019db533-f390-7bb4-b6bd-72f7230984b7",
  pageTypeSlug: "book",
  slug: "cinnamon-bun-2",
  title: "Cinnamon Bun 2",
  status: "not-started",
  author: "michael linnett",
  unitSlug: "words",
  position: 2,
  ownLength: 105500,
  publishedAt: "2020-10-07",
  partOfSlugs: ["book-series/cinnamon-bun"],
  source: "kindle",
  externalId: "B08KWB81WS",
  externalLink: "https://amazon.com/dp/B08KWB81WS",
} as const satisfies Book
