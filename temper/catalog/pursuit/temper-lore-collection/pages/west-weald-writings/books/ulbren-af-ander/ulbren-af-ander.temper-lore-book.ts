import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ulbrenAfAnder = {
  id: "01a0d60d-4ab0-7569-b433-a6d8cf76a82e",
  type: "page-type/temper-lore-book",
  slug: "ulbren-af-ander",
  title: "Ulbren af-Ander",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7995,
  bookIndex: 20,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
