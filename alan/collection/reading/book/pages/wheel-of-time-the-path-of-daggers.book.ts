import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const wheelOfTimeThePathOfDaggers = {
  id: "019db533-f39a-79c5-9a1c-59b5559a6db4",
  type: "page-type/book",
  slug: "wheel-of-time-the-path-of-daggers",
  title: "Wheel of Time: The Path of Daggers",
  status: "completed",
  grade: "B",
  author: "Robert Jordan",
  unit: "unit/words",
  position: 8,
  ownLength: 167250,
  ownProgress: 167250,
  publishedAt: "2010-04-14",
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B003H4I44K",
      externalLink: "https://amazon.com/dp/B003H4I44K",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
