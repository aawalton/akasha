import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const burnedFragment = {
  id: "01a0d60d-4aae-75be-97c8-f116a704ea1f",
  type: "page-type/temper-lore-book",
  slug: "burned-fragment",
  title: "Burned Fragment",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8103,
  bookIndex: 93,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
