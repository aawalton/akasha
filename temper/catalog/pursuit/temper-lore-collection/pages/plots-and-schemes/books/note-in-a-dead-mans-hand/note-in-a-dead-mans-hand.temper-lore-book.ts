import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const noteInADeadMansHand = {
  id: "01a0d5f4-c388-77e2-90b0-9faaead7b243",
  type: "page-type/temper-lore-book",
  slug: "note-in-a-dead-mans-hand",
  title: "Note in a Dead Man's Hand",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 1175,
  bookIndex: 36,
  charted: true,
  quest: 1527,
  positions: "jsonl",
} as const satisfies TemperLoreBook
