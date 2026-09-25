import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteToVanus = {
  id: "01a0d5f5-444c-7e2c-8f8f-c3fe1fe159f7",
  type: "page-type/temper-lore-book",
  slug: "note-to-vanus",
  title: "Note to Vanus",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 4726,
  bookIndex: 89,
  charted: true,
  quest: 6097,
  positions: "jsonl",
} as const satisfies TemperLoreBook
