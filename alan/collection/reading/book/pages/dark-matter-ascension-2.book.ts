import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const darkMatterAscension2 = {
  id: "019db533-f390-7c7e-ae33-7e7d5ac8c033",
  type: "page-type/book",
  slug: "dark-matter-ascension-2",
  title: "Dark Matter Ascension 2",
  status: "not-started",
  author: "James M. MacDonald",
  unit: "unit/words",
  position: 2,
  ownLength: 171750,
  publishedAt: "2025-06-30",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DDW2NDKG",
      externalLink: "https://amazon.com/dp/B0DDW2NDKG",
    },
  ],
} as const satisfies Book
