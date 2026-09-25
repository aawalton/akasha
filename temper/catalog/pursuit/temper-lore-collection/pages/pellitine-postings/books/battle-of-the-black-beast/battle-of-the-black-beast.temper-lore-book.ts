import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const battleOfTheBlackBeast = {
  id: "01a0d60b-4e02-7f6d-8182-488b23d3f056",
  type: "page-type/temper-lore-book",
  slug: "battle-of-the-black-beast",
  title: "Battle of the Black Beast",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5722,
  bookIndex: 22,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
