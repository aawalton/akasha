import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const voicesOnTheWind = {
  id: "01a0d60d-9a64-74e3-95ea-90ffbbea394e",
  type: "page-type/temper-lore-book",
  slug: "voices-on-the-wind",
  title: "Voices on the Wind",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8194,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
