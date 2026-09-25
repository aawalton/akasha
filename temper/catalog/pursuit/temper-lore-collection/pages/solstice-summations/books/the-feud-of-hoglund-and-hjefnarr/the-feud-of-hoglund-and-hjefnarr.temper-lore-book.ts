import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theFeudOfHoglundAndHjefnarr = {
  id: "01a0d60d-ff6a-7048-a2fd-b185deee82ab",
  type: "page-type/temper-lore-book",
  slug: "the-feud-of-hoglund-and-hjefnarr",
  title: "The Feud of Hoglund and Hjefnarr",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8295,
  bookIndex: 55,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
