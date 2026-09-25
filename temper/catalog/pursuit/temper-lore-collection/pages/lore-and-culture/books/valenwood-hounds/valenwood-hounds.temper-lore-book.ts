import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const valenwoodHounds = {
  id: "01a0d5f3-3fdc-7d31-ab93-5ba2f32f82a9",
  type: "page-type/temper-lore-book",
  slug: "valenwood-hounds",
  title: "Valenwood Hounds",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 1825,
  bookIndex: 80,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
