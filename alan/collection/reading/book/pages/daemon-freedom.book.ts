import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const daemonFreedom = {
  id: "019db533-f39b-7087-bf01-6b0092b0d531",
  type: "page-type/book",
  slug: "daemon-freedom",
  title: "Daemon: Freedom",
  status: "not-started",
  author: "François-René de Chateaubriand",
  unit: "unit/words",
  position: 1,
  ownLength: 104250,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B002VUFKDY",
      externalLink: "https://www.amazon.com/dp/B002VUFKDY",
      lastSyncedAt: "2025-10-11",
    },
  ],
} as const satisfies Book
