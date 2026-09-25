import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const ultimateLevel1ShatteredBoundaries = {
  id: "019db533-f38b-7116-87e0-f8515d559739",
  type: "page-type/book",
  slug: "ultimate-level-1-shattered-boundaries",
  title: "Ultimate Level 1: Shattered Boundaries",
  status: "completed",
  author: "Shawn Wilson",
  unit: "unit/words",
  position: 3,
  ownLength: 105000,
  ownProgress: 105000,
  publishedAt: "2024-07-01",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0D2DXC92Y",
      externalLink: "https://amazon.com/dp/B0D2DXC92Y",
    },
  ],
} as const satisfies Book
