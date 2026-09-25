import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const whatsAnArcanistPart1 = {
  id: "01a0d60c-eb9c-740a-85a8-3870a63cad04",
  type: "page-type/temper-lore-book",
  slug: "whats-an-arcanist-part-1",
  title: "What's an Arcanist? Part 1",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7460,
  bookIndex: 56,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
