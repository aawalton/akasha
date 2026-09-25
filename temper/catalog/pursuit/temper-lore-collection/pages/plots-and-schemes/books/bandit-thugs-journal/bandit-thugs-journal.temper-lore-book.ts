import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const banditThugsJournal = {
  id: "01a0d5f4-c383-7482-9dc3-15226567ef92",
  type: "page-type/temper-lore-book",
  slug: "bandit-thugs-journal",
  title: "Bandit Thug's Journal",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 2044,
  bookIndex: 78,
  charted: true,
  quest: 4984,
  positions: "jsonl",
} as const satisfies TemperLoreBook
