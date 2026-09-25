import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const disciplinaryAction = {
  id: "01a0d60a-d5bc-79bd-8ee1-722cf82bace9",
  type: "page-type/temper-lore-book",
  slug: "disciplinary-action",
  title: "Disciplinary Action",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4899,
  bookIndex: 84,
  charted: true,
  quest: 6121,
  positions: "jsonl",
} as const satisfies TemperLoreBook
