import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const frostbreakChalice = {
  id: "01a0d5f6-d68a-744b-8293-680e61c382e0",
  type: "page-type/temper-lore-book",
  slug: "frostbreak-chalice",
  title: "Frostbreak Chalice",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3113,
  bookIndex: 64,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
