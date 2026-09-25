import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const odeToOinkers = {
  id: "01a0d5f6-1c16-71a2-949b-478aee2a7072",
  type: "page-type/temper-lore-book",
  slug: "ode-to-oinkers",
  title: "Ode to Oinkers",
  collection: "temper-lore-collection/words-of-the-poets",
  esoBookId: 349,
  bookIndex: 5,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
