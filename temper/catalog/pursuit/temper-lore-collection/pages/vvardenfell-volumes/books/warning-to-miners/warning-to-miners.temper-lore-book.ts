import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const warningToMiners = {
  id: "01a0d5f7-aa9a-7cdc-b8ae-999eeccfae34",
  type: "page-type/temper-lore-book",
  slug: "warning-to-miners",
  title: "Warning to Miners",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4031,
  bookIndex: 46,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
