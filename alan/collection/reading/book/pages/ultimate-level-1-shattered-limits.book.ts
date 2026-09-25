import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const ultimateLevel1ShatteredLimits = {
  id: "019db533-f38b-7107-8897-fb8f0fa95ad3",
  type: "page-type/book",
  slug: "ultimate-level-1-shattered-limits",
  title: "Ultimate Level 1: Shattered Limits",
  status: "completed",
  author: "Shawn Wilson",
  unit: "unit/words",
  position: 2,
  ownLength: 119750,
  ownProgress: 119750,
  publishedAt: "2024-04-23",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0CW6KV1DS",
      externalLink: "https://amazon.com/dp/B0CW6KV1DS",
    },
  ],
} as const satisfies Book
