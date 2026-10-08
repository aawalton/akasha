import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const theElderEmpireShadowOfShadowAndSea = {
  id: "019db533-f39a-7da9-b436-8921e4a4e8df",
  type: "page-type/book",
  slug: "the-elder-empire-shadow-of-shadow-and-sea",
  title: "The Elder Empire - Shadow: Of Shadow and Sea",
  status: "not-started",
  unit: "unit/words",
  ownLength: 101000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B00RE68P8C",
      externalLink: "https://www.amazon.com/dp/B00RE68P8C",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
