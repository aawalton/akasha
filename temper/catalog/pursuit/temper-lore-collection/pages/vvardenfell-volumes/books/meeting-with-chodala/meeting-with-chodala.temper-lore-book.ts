import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const meetingWithChodala = {
  id: "01a0d5f7-aa99-7ac0-85ad-be5977f3aee5",
  type: "page-type/temper-lore-book",
  slug: "meeting-with-chodala",
  title: "Meeting with Chodala",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4063,
  bookIndex: 87,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
