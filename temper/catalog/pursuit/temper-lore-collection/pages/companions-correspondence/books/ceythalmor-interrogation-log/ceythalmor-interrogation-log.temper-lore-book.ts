import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ceythalmorInterrogationLog = {
  id: "01a0d60d-bbe4-7ce2-abec-15669facc482",
  type: "page-type/temper-lore-book",
  slug: "ceythalmor-interrogation-log",
  title: "Ceythalmor Interrogation Log",
  collection: "temper-lore-collection/companions-correspondence",
  esoBookId: 8009,
  bookIndex: 14,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
