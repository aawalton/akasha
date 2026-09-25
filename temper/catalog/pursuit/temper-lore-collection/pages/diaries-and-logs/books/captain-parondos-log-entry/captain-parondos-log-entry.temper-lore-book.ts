import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const captainParondosLogEntry = {
  id: "01a0d5f2-509e-7cf4-acff-bfec3808a8f6",
  type: "page-type/temper-lore-book",
  slug: "captain-parondos-log-entry",
  title: "Captain Parondo's Log Entry",
  collection: "temper-lore-collection/diaries-and-logs",
  esoBookId: 871,
  bookIndex: 18,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
