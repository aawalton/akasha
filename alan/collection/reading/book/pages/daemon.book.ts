import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const daemon = {
  id: "019db533-f39b-7309-971e-bf4518eec2e0",
  type: "page-type/book",
  slug: "daemon",
  title: "Daemon",
  status: "not-started",
  author: "Daniel Suarez",
  unit: "unit/words",
  ownLength: 122250,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B003QP4NPE",
      externalLink: "https://www.amazon.com/dp/B003QP4NPE",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
