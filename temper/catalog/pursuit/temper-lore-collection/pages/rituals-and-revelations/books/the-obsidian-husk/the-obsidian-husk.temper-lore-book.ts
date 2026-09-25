import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theObsidianHusk = {
  id: "01a0d5f5-444c-752c-803b-8d52f72dc7ab",
  type: "page-type/temper-lore-book",
  slug: "the-obsidian-husk",
  title: "The Obsidian Husk",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 867,
  bookIndex: 26,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
