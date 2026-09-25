import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const dealingWithWerewolves = {
  id: "01a0d5f5-f3e3-717f-a358-9b0a15423e49",
  type: "page-type/temper-lore-book",
  slug: "dealing-with-werewolves",
  title: "Dealing with Werewolves",
  collection: "temper-lore-collection/the-world-and-its-creatures",
  esoBookId: 1480,
  bookIndex: 63,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
