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
} as const satisfies Book
