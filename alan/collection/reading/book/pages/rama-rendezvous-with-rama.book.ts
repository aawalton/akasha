import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const ramaRendezvousWithRama = {
  id: "019db533-f39a-7c76-a347-64d2f0398b9d",
  type: "page-type/book",
  slug: "rama-rendezvous-with-rama",
  title: "Rama: Rendezvous with Rama",
  status: "not-started",
  author: "Arthur C. Clarke",
  unit: "unit/words",
  ownLength: 65250,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B07XD75HGV",
      externalLink: "https://www.amazon.com/dp/B07XD75HGV",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
