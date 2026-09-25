import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aStudyOfFabricants = {
  id: "01a0d60a-a212-7146-9a3a-93d0950305db",
  type: "page-type/temper-lore-book",
  slug: "a-study-of-fabricants",
  title: "A Study of Fabricants",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4594,
  bookIndex: 10,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
