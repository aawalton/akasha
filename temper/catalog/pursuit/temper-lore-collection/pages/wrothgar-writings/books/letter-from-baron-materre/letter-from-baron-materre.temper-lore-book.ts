import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromBaronMaterre = {
  id: "01a0d5f6-d68b-7674-ad1d-253ff61e9e97",
  type: "page-type/temper-lore-book",
  slug: "letter-from-baron-materre",
  title: "Letter from Baron Materre",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3021,
  bookIndex: 57,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
