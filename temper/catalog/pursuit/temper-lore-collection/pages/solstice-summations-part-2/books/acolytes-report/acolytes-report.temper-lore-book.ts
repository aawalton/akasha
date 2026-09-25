import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const acolytesReport = {
  id: "01a0d60e-45b2-78f3-ad25-d8a8648f871e",
  type: "page-type/temper-lore-book",
  slug: "acolytes-report",
  title: "Acolyte's Report",
  collection: "temper-lore-collection/solstice-summations-part-2",
  esoBookId: 8528,
  bookIndex: 21,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
