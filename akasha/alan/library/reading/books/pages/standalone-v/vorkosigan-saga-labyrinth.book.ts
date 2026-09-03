import type { Book } from "../../book.page-type.ts"

export const vorkosiganSagaLabyrinth = {
  id: "019db533-f39a-7e7f-8c52-ca805dbb6f38",
  pageTypeSlug: "book",
  slug: "vorkosigan-saga-labyrinth",
  title: "Vorkosigan Saga: Labyrinth",
  kind: "read",
  status: "not-started",
  unitSlug: "words",
  position: 3,
  ownLength: 30000,
  source: "kindle",
  externalId: "B004YXBDG4",
  externalLink: "https://www.amazon.com/dp/B004YXBDG4",
  lastSyncedAt: "2025-10-11",
} as const satisfies Book
