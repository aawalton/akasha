import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sunkIntoOuze = {
  id: "01a0d5f3-3fdb-72a1-9de9-4c89f22f89d5",
  type: "page-type/temper-lore-book",
  slug: "sunk-into-ouze",
  title: "Sunk into Ouze",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 400,
  bookIndex: 3,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
