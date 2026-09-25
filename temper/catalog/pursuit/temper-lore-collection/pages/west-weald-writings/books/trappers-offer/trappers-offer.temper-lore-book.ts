import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const trappersOffer = {
  id: "01a0d60d-4ab0-7511-942f-ea31c8f612b5",
  type: "page-type/temper-lore-book",
  slug: "trappers-offer",
  title: "Trapper's Offer",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8064,
  charted: true,
  quest: 7209,
  positions: "jsonl",
} as const satisfies TemperLoreBook
