import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tommyBonessJournal = {
  id: "01a0d5f4-6f1b-7380-b75d-4fba48664d86",
  type: "page-type/temper-lore-book",
  slug: "tommy-boness-journal",
  title: "Tommy Bones's Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 4098,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
