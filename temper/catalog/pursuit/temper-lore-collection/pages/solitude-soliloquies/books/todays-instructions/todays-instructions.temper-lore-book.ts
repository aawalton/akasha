import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const todaysInstructions = {
  id: "01a0d60b-8109-758c-8e74-67564f313916",
  type: "page-type/temper-lore-book",
  slug: "todays-instructions",
  title: "Today's Instructions",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5768,
  bookIndex: 92,
  charted: true,
  quest: 6460,
  positions: "jsonl",
} as const satisfies TemperLoreBook
