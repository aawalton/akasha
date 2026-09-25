import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const oldKingdomGoldenhand = {
  id: "019db533-f39b-70cd-b048-e348513caae0",
  type: "page-type/book",
  slug: "old-kingdom-goldenhand",
  title: "Old Kingdom: Goldenhand",
  status: "not-started",
  author: "Garth Nix",
  unit: "unit/words",
  position: 4,
  ownLength: 90250,
  publishedAt: "2016-10-04",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B01ARJSYDI",
      externalLink: "https://www.amazon.com/dp/B01ARJSYDI",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
