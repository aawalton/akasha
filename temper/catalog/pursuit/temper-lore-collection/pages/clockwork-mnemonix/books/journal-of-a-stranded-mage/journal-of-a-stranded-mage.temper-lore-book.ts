import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journalOfAStrandedMage = {
  id: "01a0d60a-a213-7b76-80d2-139c2fcdadc7",
  type: "page-type/temper-lore-book",
  slug: "journal-of-a-stranded-mage",
  title: "Journal of a Stranded Mage",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4593,
  bookIndex: 35,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
