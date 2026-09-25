import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const galacticEmpireTheStarsLikeDust = {
  id: "019db533-f39a-79dd-a76f-1f803846ba5d",
  type: "page-type/book",
  slug: "galactic-empire-the-stars-like-dust",
  title: "Galactic Empire: The Stars, Like Dust",
  status: "not-started",
  author: "Isaac Asimov",
  unit: "unit/words",
  ownLength: 60750,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B08GJZSFP6",
      externalLink: "https://www.amazon.com/dp/B08GJZSFP6",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
