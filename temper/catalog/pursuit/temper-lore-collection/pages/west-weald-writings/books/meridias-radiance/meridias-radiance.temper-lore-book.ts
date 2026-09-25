import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const meridiasRadiance = {
  id: "01a0d60d-4aaf-789b-907e-ebeab53e4a18",
  type: "page-type/temper-lore-book",
  slug: "meridias-radiance",
  title: "Meridia's Radiance",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 7883,
  bookIndex: 97,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
