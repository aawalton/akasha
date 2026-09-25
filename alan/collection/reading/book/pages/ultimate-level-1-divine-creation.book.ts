import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const ultimateLevel1DivineCreation = {
  id: "019db533-f38a-7520-b429-c494c188696d",
  type: "page-type/book",
  slug: "ultimate-level-1-divine-creation",
  title: "Ultimate Level 1: Divine Creation",
  status: "completed",
  author: "Shawn Wilson",
  unit: "unit/words",
  position: 10,
  ownLength: 164500,
  ownProgress: 164500,
  publishedAt: "2025-11-06",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0FXJB3NR6",
      externalLink: "https://amazon.com/dp/B0FXJB3NR6",
    },
  ],
} as const satisfies Book
