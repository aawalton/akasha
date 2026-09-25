import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const legendOfHamanForgefire = {
  id: "01a0d5f5-7766-7a57-a3a4-769a3e89c739",
  type: "page-type/temper-lore-book",
  slug: "legend-of-haman-forgefire",
  title: "Legend of Haman Forgefire",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 1591,
  bookIndex: 72,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
