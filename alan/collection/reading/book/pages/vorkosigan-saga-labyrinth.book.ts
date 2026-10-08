import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const vorkosiganSagaLabyrinth = {
  id: "019db533-f39a-7e7f-8c52-ca805dbb6f38",
  type: "page-type/book",
  slug: "vorkosigan-saga-labyrinth",
  title: "Vorkosigan Saga: Labyrinth",
  status: "not-started",
  unit: "unit/words",
  position: 3,
  ownLength: 30000,
  externalIdentity: [
    {
      source: "kindle",
      externalId: "B004YXBDG4",
      externalLink: "https://www.amazon.com/dp/B004YXBDG4",
      lastSyncedAt: "2025-10-11",
    },
  ],
  createdAt: "2026-04-22T12:39:34.042Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
