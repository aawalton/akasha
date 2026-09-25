import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const stormComingIn = {
  id: "01a0d60d-ff6a-720d-acaf-9f56a01a5a4d",
  type: "page-type/temper-lore-book",
  slug: "storm-coming-in",
  title: "Storm Coming In",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8397,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
