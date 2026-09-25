import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bloodSealedContract = {
  id: "01a0d5f4-c383-7848-a151-f2100287bb82",
  type: "page-type/temper-lore-book",
  slug: "blood-sealed-contract",
  title: "Blood-Sealed Contract",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 761,
  bookIndex: 24,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
