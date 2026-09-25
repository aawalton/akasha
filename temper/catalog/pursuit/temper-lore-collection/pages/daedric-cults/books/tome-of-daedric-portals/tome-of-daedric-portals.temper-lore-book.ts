import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tomeOfDaedricPortals = {
  id: "01a0d5f2-253c-76e6-98b6-afc584d5c1f9",
  type: "page-type/temper-lore-book",
  slug: "tome-of-daedric-portals",
  title: "Tome of Daedric Portals",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 1143,
  bookIndex: 81,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
