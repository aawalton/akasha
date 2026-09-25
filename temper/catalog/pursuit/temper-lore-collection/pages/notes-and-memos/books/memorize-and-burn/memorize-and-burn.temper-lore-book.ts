import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const memorizeAndBurn = {
  id: "01a0d5f4-3c12-73db-9bd9-829c65dacde4",
  type: "page-type/temper-lore-book",
  slug: "memorize-and-burn",
  title: "Memorize and Burn!",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 2980,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
