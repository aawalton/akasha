import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const arraisJournal = {
  id: "01a0d5f4-6f19-7293-abaa-a77e803ce823",
  type: "page-type/temper-lore-book",
  slug: "arrais-journal",
  title: "Arrai's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1318,
  bookIndex: 56,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
