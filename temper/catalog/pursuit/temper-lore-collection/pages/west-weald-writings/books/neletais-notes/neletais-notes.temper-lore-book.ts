import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const neletaisNotes = {
  id: "01a0d60d-4aaf-73d6-a474-f87b56fec954",
  type: "page-type/temper-lore-book",
  slug: "neletais-notes",
  title: "Neletai's Notes",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8053,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
