import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mercenariesRequired = {
  id: "01a0d60d-4aaf-7449-8cb9-2b05e2ddebcc",
  type: "page-type/temper-lore-book",
  slug: "mercenaries-required",
  title: "Mercenaries Required",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8141,
  bookIndex: 64,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
