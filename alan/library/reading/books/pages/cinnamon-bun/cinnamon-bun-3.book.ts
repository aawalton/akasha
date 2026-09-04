import type { Book } from "../../book.page-type.ts"

export const cinnamonBun3 = {
  id: "019db533-f390-7bc7-ab22-e83f6b05b305",
  pageTypeSlug: "book",
  slug: "cinnamon-bun-3",
  title: "Cinnamon Bun 3",
  status: "not-started",
  author: "Laurie Gilmore",
  unitSlug: "words",
  position: 3,
  ownLength: 117750,
  publishedAt: "2021-09-14",
  partOfSlugs: ["book-series/cinnamon-bun"],
  source: "kindle",
  externalId: "B09DGSHPJ8",
  externalLink: "https://amazon.com/dp/B09DGSHPJ8",
} as const satisfies Book
