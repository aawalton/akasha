import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBladesongsOfBoethraVolumeV = {
  id: "01a0d5f2-253b-725b-858c-42a6655b6bab",
  type: "page-type/temper-lore-book",
  slug: "the-bladesongs-of-boethra-volume-v",
  title: "The Bladesongs of Boethra, Volume V",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 7890,
  charted: true,
  quest: 7079,
  positions: "jsonl",
} as const satisfies TemperLoreBook
