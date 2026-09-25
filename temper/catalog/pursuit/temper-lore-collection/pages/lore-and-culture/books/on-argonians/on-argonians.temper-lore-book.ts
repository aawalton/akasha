import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onArgonians = {
  id: "01a0d5f3-3fdb-7d73-9b80-c1c4fe0568a8",
  type: "page-type/temper-lore-book",
  slug: "on-argonians",
  title: "On Argonians",
  collection: "temper-lore-collection/lore-and-culture",
  esoBookId: 676,
  bookIndex: 13,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
