import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theElderEmpireSeaOfSeaAndShadow = {
  id: "019db533-f39a-7dde-a5cf-b5c7abe1fd22",
  type: "page-type/book",
  slug: "the-elder-empire-sea-of-sea-and-shadow",
  title: "The Elder Empire - Sea: Of Sea and Shadow",
  status: "not-started",
  unit: "unit/words",
  ownLength: 107000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00RE55XXS",
      externalLink: "https://www.amazon.com/dp/B00RE55XXS",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
