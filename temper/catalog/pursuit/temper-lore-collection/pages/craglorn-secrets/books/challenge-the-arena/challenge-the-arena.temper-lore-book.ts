import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const challengeTheArena = {
  id: "01a0d5f1-c919-75dd-b035-24ce3f90f249",
  type: "page-type/temper-lore-book",
  slug: "challenge-the-arena",
  title: "Challenge the Arena",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2723,
  bookIndex: 99,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
