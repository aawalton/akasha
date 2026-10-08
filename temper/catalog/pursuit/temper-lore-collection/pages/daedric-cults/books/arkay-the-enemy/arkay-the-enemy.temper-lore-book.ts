import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const arkayTheEnemy = {
  id: "01a0d5f2-253a-7052-b33b-e7e36e92b4ba",
  type: "page-type/temper-lore-book",
  slug: "arkay-the-enemy",
  title: "Arkay the Enemy",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 437,
  bookIndex: 10,
  charted: true,
  quest: 4160,
  positions: "jsonl",
  createdAt: "2026-09-25T00:23:31.386Z",
  updatedAt: "2026-09-25T00:23:33.000Z",
} as const satisfies TemperLoreBook
