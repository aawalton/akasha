import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const notesOnThoatReplicanum = {
  id: "01a0d60d-708e-70d7-985c-ae983ee4db37",
  type: "page-type/temper-lore-book",
  slug: "notes-on-thoat-replicanum",
  title: "Notes on Tho'at Replicanum",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 7792,
  bookIndex: 28,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
