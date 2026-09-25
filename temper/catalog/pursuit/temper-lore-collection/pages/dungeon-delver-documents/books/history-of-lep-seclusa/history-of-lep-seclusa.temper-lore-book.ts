import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const historyOfLepSeclusa = {
  id: "01a0d60d-708d-724a-ac8c-41f3d7651891",
  type: "page-type/temper-lore-book",
  slug: "history-of-lep-seclusa",
  title: "History of Lep Seclusa",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 8177,
  bookIndex: 34,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
