import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const psijicCodexListOfDeadDrops = {
  id: "01a0d60a-d5bd-7812-af7b-d15f7abdd4e4",
  type: "page-type/temper-lore-book",
  slug: "psijic-codex-list-of-dead-drops",
  title: "Psijic Codex: List of Dead Drops",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4837,
  bookIndex: 55,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
