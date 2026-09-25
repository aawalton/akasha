import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onTopalBay = {
  id: "01a0d60b-fdb0-7620-8bd4-5154fc87ca01",
  type: "page-type/temper-lore-book",
  slug: "on-topal-bay",
  title: "On Topal Bay",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 6685,
  bookIndex: 38,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
