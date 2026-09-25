import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const redoranCookingSecrets = {
  id: "01a0d5f6-6d41-7c8e-81ce-47f899a86858",
  type: "page-type/temper-lore-book",
  slug: "redoran-cooking-secrets",
  title: "Redoran Cooking Secrets",
  collection: "temper-lore-collection/skill-books",
  esoBookId: 457,
  bookIndex: 76,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
