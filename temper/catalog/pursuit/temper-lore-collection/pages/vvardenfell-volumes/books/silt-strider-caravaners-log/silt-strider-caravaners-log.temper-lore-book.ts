import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const siltStriderCaravanersLog = {
  id: "01a0d5f7-aa99-7bb0-a370-fa782cdcfb34",
  type: "page-type/temper-lore-book",
  slug: "silt-strider-caravaners-log",
  title: "Silt Strider Caravaner's Log",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4040,
  bookIndex: 77,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
