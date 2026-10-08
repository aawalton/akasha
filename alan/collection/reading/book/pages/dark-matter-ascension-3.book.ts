import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const darkMatterAscension3 = {
  id: "019db533-f390-7c6e-9f7c-c61135e365d8",
  type: "page-type/book",
  slug: "dark-matter-ascension-3",
  title: "Dark Matter Ascension 3",
  status: "not-started",
  author: "James M. MacDonald",
  unit: "unit/words",
  position: 3,
  ownLength: 242000,
  publishedAt: "2025-09-29",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0FCFTMJBG",
      externalLink: "https://amazon.com/dp/B0FCFTMJBG",
    },
  ],
  createdAt: "2026-04-22T12:39:34.032Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
