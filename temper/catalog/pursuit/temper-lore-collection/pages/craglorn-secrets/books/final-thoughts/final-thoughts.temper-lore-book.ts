import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const finalThoughts = {
  id: "01a0d5f1-c91a-772d-88bb-94b3a86f2ab0",
  type: "page-type/temper-lore-book",
  slug: "final-thoughts",
  title: "Final Thoughts",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2673,
  bookIndex: 63,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
