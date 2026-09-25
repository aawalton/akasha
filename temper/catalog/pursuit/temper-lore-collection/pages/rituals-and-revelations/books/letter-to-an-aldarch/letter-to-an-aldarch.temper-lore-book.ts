import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToAnAldarch = {
  id: "01a0d5f5-444b-74fe-8c60-9295527183c1",
  type: "page-type/temper-lore-book",
  slug: "letter-to-an-aldarch",
  title: "Letter to an Aldarch",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 957,
  bookIndex: 30,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
