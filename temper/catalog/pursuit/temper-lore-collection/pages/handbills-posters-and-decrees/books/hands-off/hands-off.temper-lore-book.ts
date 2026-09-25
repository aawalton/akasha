import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const handsOff = {
  id: "01a0d5f2-83a2-753e-aa6a-28db46aa58db",
  type: "page-type/temper-lore-book",
  slug: "hands-off",
  title: "Hands Off",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 2769,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
