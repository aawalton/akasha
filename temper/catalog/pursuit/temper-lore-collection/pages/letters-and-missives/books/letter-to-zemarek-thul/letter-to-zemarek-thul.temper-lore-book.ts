import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToZemarekThul = {
  id: "01a0d5f3-0ef8-722e-85a0-1b4bc6723d47",
  type: "page-type/temper-lore-book",
  slug: "letter-to-zemarek-thul",
  title: "Letter to Zemarek-Thul",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 2520,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
