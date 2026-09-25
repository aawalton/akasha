import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aDistractedEnemy = {
  id: "01a0d5f5-444b-768c-8eac-32f292ed8274",
  type: "page-type/temper-lore-book",
  slug: "a-distracted-enemy",
  title: "A Distracted Enemy",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 1870,
  bookIndex: 69,
  charted: true,
  quest: 4854,
  positions: "jsonl",
} as const satisfies TemperLoreBook
