import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const epitaphForTheFiveLoyalRetainers = {
  id: "01a0d60d-4aaf-7575-89ea-bc37c3774c7f",
  type: "page-type/temper-lore-book",
  slug: "epitaph-for-the-five-loyal-retainers",
  title: "Epitaph for the Five Loyal Retainers",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7865,
  bookIndex: 77,
  charted: true,
  quest: 7086,
  positions: "jsonl",
} as const satisfies TemperLoreBook
