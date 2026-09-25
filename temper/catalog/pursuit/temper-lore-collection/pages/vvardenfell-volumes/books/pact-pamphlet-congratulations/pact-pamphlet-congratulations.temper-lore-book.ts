import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const pactPamphletCongratulations = {
  id: "01a0d5f7-aa99-73a0-9bba-880fd27f2752",
  type: "page-type/temper-lore-book",
  slug: "pact-pamphlet-congratulations",
  title: "Pact Pamphlet: Congratulations!",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4550,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
