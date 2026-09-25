import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const morganesGuildOrders = {
  id: "01a0d60b-fdb0-786c-b694-609777f195a0",
  type: "page-type/temper-lore-book",
  slug: "morganes-guild-orders",
  title: "Morgane's Guild Orders",
  collection: "temper-lore-collection/books-of-blackwood",
  esoBookId: 5427,
  bookIndex: 15,
  charted: true,
  quest: 6337,
  positions: "jsonl",
} as const satisfies TemperLoreBook
