import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theMaulbornManifesto = {
  id: "01a0d5f4-c389-790b-b036-da60add6c32b",
  type: "page-type/temper-lore-book",
  slug: "the-maulborn-manifesto",
  title: "The Maulborn Manifesto",
  collection: "temper-lore-collection/plots-and-schemes",
  esoBookId: 1004,
  bookIndex: 31,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
