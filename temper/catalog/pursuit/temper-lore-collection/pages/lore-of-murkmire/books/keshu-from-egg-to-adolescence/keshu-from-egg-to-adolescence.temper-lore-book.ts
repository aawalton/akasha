import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const keshuFromEggToAdolescence = {
  id: "01a0d5f6-a299-7288-8134-71da459a8d45",
  type: "page-type/temper-lore-book",
  slug: "keshu-from-egg-to-adolescence",
  title: "Keshu: From Egg to Adolescence",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 2800,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
