import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wormCultJournal = {
  id: "01a0d5f2-253c-7981-8bce-18e5cc06af6e",
  type: "page-type/temper-lore-book",
  slug: "worm-cult-journal",
  title: "Worm Cult Journal",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 8293,
  charted: true,
  positions: "jsonl",
  createdAt: "2026-09-25T00:23:31.388Z",
  updatedAt: "2026-09-25T00:23:33.000Z",
} as const satisfies TemperLoreBook
