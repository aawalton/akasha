import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const darkMatterAscension = {
  id: "019db533-f390-7c66-bfc6-364c34552fe8",
  type: "page-type/book",
  slug: "dark-matter-ascension",
  title: "Dark Matter Ascension",
  status: "not-started",
  author: "James M. MacDonald",
  unit: "unit/words",
  position: 1,
  ownLength: 175250,
  publishedAt: "2025-03-31",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DZDBYDTR",
      externalLink: "https://amazon.com/dp/B0DZDBYDTR",
    },
  ],
} as const satisfies Book
