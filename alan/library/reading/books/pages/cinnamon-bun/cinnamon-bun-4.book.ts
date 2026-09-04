import type { Book } from "../../book.page-type.ts"

export const cinnamonBun4 = {
  id: "019db533-f390-7bab-bfcc-d27185f72353",
  pageTypeSlug: "book",
  slug: "cinnamon-bun-4",
  title: "Cinnamon Bun 4",
  kind: "read",
  status: "not-started",
  unitSlug: "words",
  position: 4,
  ownLength: 78000,
  publishedAt: "2022-12-20",
  partOfSlugs: ["book-series/cinnamon-bun"],
  source: "kindle",
  externalId: "B0BK26CB6B",
  externalLink: "https://amazon.com/dp/B0BK26CB6B",
} as const satisfies Book
