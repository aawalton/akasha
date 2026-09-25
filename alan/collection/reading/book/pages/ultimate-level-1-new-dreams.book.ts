import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const ultimateLevel1NewDreams = {
  id: "019db533-f38b-70ef-86b3-c992fc685364",
  type: "page-type/book",
  slug: "ultimate-level-1-new-dreams",
  title: "Ultimate Level 1: New Dreams",
  status: "completed",
  author: "Shawn Wilson",
  unit: "unit/words",
  position: 4,
  ownLength: 121250,
  ownProgress: 121250,
  publishedAt: "2024-09-01",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0D5YPWPHQ",
      externalLink: "https://amazon.com/dp/B0D5YPWPHQ",
    },
  ],
} as const satisfies Book
