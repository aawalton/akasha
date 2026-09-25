import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const mudCoveredLetter = {
  id: "01a0d60c-eb9c-75cd-81bc-dce848d25f9d",
  type: "page-type/temper-lore-book",
  slug: "mud-covered-letter",
  title: "Mud-Covered Letter",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7622,
  bookIndex: 28,
  charted: true,
  quest: 6990,
  positions: "jsonl",
} as const satisfies TemperLoreBook
