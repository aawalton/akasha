import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const necromancerAnniarsJournal = {
  id: "01a0d60d-4aaf-7eb1-863f-bbf70e85a48e",
  type: "page-type/temper-lore-book",
  slug: "necromancer-anniars-journal",
  title: "Necromancer Anniar's Journal",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7844,
  bookIndex: 60,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
