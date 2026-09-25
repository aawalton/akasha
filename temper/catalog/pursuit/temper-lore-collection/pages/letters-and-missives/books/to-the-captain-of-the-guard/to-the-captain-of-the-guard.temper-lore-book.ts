import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const toTheCaptainOfTheGuard = {
  id: "01a0d5f3-0ef9-71f5-ac72-44fa954523c8",
  type: "page-type/temper-lore-book",
  slug: "to-the-captain-of-the-guard",
  title: "To the Captain of the Guard",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1088,
  bookIndex: 35,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
