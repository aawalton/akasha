import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theSecretStoneGuardians = {
  id: "01a0d60e-45b3-7d99-bd29-af2a700d3896",
  type: "page-type/temper-lore-book",
  slug: "the-secret-stone-guardians",
  title: "The Secret Stone Guardians",
  collection: "temper-lore-collection/solstice-summations-part-2",
  esoBookId: 8289,
  bookIndex: 40,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
