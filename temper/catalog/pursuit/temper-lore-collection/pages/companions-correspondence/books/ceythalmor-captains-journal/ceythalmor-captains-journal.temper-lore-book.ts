import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ceythalmorCaptainsJournal = {
  id: "01a0d60d-bbe4-70f4-ab24-882715d33087",
  type: "page-type/temper-lore-book",
  slug: "ceythalmor-captains-journal",
  title: "Ceythalmor Captain's Journal",
  collection: "temper-lore-collection/companions-correspondence",
  esoBookId: 8087,
  bookIndex: 22,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
