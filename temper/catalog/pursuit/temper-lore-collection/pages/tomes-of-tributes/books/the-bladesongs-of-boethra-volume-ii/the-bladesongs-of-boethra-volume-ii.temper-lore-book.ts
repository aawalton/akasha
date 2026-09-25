import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theBladesongsOfBoethraVolumeIi = {
  id: "01a0d60c-9395-7975-aa90-9fcc7ca1f7f5",
  type: "page-type/temper-lore-book",
  slug: "the-bladesongs-of-boethra-volume-ii",
  title: "The Bladesongs of Boethra, Volume II",
  collection: "temper-lore-collection/tomes-of-tributes",
  esoBookId: 7901,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
