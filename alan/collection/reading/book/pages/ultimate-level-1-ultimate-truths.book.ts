import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const ultimateLevel1UltimateTruths = {
  id: "019db533-f38b-70ff-9b8b-6f4069b75af5",
  type: "page-type/book",
  slug: "ultimate-level-1-ultimate-truths",
  title: "Ultimate Level 1: Ultimate Truths",
  status: "completed",
  author: "Charles Dickens",
  unit: "unit/words",
  position: 7,
  ownLength: 168750,
  ownProgress: 168750,
  publishedAt: "2025-04-02",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B0DTGKM68P",
      externalLink: "https://amazon.com/dp/B0DTGKM68P",
    },
  ],
} as const satisfies Book
