import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const vattasWarMarqueAndReprisal = {
  id: "019db533-f39a-7f64-8143-2de092f4e2f4",
  type: "page-type/book",
  slug: "vattas-war-marque-and-reprisal",
  title: "Vatta's War: Marque and Reprisal",
  status: "not-started",
  unit: "unit/words",
  position: 1,
  ownLength: 100000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B000FC28UI",
      externalLink: "https://www.amazon.com/dp/B000FC28UI",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
