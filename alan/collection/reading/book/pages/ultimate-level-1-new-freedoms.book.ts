import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const ultimateLevel1NewFreedoms = {
  id: "019db533-f38b-711f-a46e-545eaa329774",
  type: "page-type/book",
  slug: "ultimate-level-1-new-freedoms",
  title: "Ultimate Level 1: New Freedoms",
  status: "completed",
  author: "Washington Irving",
  unit: "unit/words",
  position: 5,
  ownLength: 119250,
  ownProgress: 119250,
  publishedAt: "2024-11-01",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DF5SFJ82",
      externalLink: "https://amazon.com/dp/B0DF5SFJ82",
    },
  ],
} as const satisfies Book
