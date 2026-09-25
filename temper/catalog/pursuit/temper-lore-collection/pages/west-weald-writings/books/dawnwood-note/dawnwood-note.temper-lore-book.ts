import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dawnwoodNote = {
  id: "01a0d60d-4aaf-76e1-b9d7-f84b7a899025",
  type: "page-type/temper-lore-book",
  slug: "dawnwood-note",
  title: "Dawnwood Note",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7897,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
