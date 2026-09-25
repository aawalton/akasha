import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onTheGhostPeople = {
  id: "01a0d5f6-a29a-7247-866c-44d28ac08949",
  type: "page-type/temper-lore-book",
  slug: "on-the-ghost-people",
  title: "On the Ghost People",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 2821,
  bookIndex: 22,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
