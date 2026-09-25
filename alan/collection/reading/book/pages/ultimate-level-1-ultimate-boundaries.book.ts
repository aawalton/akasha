import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const ultimateLevel1UltimateBoundaries = {
  id: "019db533-f38b-710e-8911-65489d654e0d",
  type: "page-type/book",
  slug: "ultimate-level-1-ultimate-boundaries",
  title: "Ultimate Level 1: Ultimate Boundaries",
  status: "completed",
  author: "Shawn Wilson",
  unit: "unit/words",
  position: 8,
  ownLength: 133000,
  ownProgress: 133000,
  publishedAt: "2025-06-05",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0F4RX9HX5",
      externalLink: "https://amazon.com/dp/B0F4RX9HX5",
    },
  ],
} as const satisfies Book
