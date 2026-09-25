import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const famiaMerciussJournalPart1 = {
  id: "01a0d5f6-a299-72ca-933b-2a3a1b49929c",
  type: "page-type/temper-lore-book",
  slug: "famia-merciuss-journal-part-1",
  title: "Famia Mercius's Journal, Part 1",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5411,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
