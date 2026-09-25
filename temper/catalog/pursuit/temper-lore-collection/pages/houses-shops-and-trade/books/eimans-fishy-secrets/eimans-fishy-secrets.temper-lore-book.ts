import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const eimansFishySecrets = {
  id: "01a0d5f2-db26-7531-a1eb-d88a4760a457",
  type: "page-type/temper-lore-book",
  slug: "eimans-fishy-secrets",
  title: "Eiman's Fishy Secrets",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 347,
  bookIndex: 5,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
