import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mercenarysScorchedJournal = {
  id: "01a0d5f7-160b-7c21-93af-ea12311109ef",
  type: "page-type/temper-lore-book",
  slug: "mercenarys-scorched-journal",
  title: "Mercenary's Scorched Journal",
  collection: "temper-lore-collection/orsinium-archive",
  esoBookId: 3145,
  bookIndex: 51,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
