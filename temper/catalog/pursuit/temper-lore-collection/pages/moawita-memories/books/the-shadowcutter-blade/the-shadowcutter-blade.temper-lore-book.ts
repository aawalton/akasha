import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theShadowcutterBlade = {
  id: "01a0d60a-f1ed-748b-b79a-adfe490b8b09",
  type: "page-type/temper-lore-book",
  slug: "the-shadowcutter-blade",
  title: "The Shadowcutter Blade",
  collection: "temper-lore-collection/moawita-memories",
  esoBookId: 4820,
  bookIndex: 6,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
