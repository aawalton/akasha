import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const nerevarTheCaptain = {
  id: "01a0d60a-a213-733a-bb31-8191868cf821",
  type: "page-type/temper-lore-book",
  slug: "nerevar-the-captain",
  title: "Nerevar the Captain",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4800,
  bookIndex: 79,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
