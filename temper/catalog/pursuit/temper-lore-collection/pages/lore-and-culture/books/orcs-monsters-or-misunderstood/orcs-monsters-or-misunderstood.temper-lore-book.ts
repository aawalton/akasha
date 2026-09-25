import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const orcsMonstersOrMisunderstood = {
  id: "01a0d5f3-3fdb-78ff-a32f-10345e3fde62",
  type: "page-type/temper-lore-book",
  slug: "orcs-monsters-or-misunderstood",
  title: "Orcs: Monsters or Misunderstood?",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 408,
  bookIndex: 5,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
