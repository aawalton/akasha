import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const sothaSilAndTheScribe = {
  id: "01a0d5f5-7767-73f8-85d6-382edb4593ce",
  type: "page-type/temper-lore-book",
  slug: "sotha-sil-and-the-scribe",
  title: "Sotha Sil and the Scribe",
  collection: "temper-lore-collection/tales-of-tamriel",
  esoBookId: 5172,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
