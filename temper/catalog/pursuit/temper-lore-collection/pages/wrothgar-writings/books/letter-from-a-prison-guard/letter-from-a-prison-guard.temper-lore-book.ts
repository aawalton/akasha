import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromAPrisonGuard = {
  id: "01a0d5f6-d68b-74c8-94af-831d7043924a",
  type: "page-type/temper-lore-book",
  slug: "letter-from-a-prison-guard",
  title: "Letter from a Prison Guard",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3168,
  bookIndex: 84,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
