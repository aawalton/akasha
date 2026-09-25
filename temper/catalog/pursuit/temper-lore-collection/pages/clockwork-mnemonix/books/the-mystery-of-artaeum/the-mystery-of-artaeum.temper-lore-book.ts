import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theMysteryOfArtaeum = {
  id: "01a0d60a-a214-725f-85b7-2185982d13d0",
  type: "page-type/temper-lore-book",
  slug: "the-mystery-of-artaeum",
  title: "The Mystery of Artaeum",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4614,
  bookIndex: 16,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
