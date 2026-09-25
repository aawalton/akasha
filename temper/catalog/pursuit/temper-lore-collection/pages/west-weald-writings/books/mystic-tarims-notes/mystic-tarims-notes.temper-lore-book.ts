import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mysticTarimsNotes = {
  id: "01a0d60d-4aaf-7d70-8336-53b9dfabf3c2",
  type: "page-type/temper-lore-book",
  slug: "mystic-tarims-notes",
  title: "Mystic Tarim's Notes",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8012,
  bookIndex: 45,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
