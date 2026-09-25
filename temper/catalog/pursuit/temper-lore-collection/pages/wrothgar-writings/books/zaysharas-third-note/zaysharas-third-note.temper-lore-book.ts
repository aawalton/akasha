import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const zaysharasThirdNote = {
  id: "01a0d5f6-d68c-7483-8e54-bd2e49f05cc1",
  type: "page-type/temper-lore-book",
  slug: "zaysharas-third-note",
  title: "Zayshara's Third Note",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3041,
  bookIndex: 38,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
