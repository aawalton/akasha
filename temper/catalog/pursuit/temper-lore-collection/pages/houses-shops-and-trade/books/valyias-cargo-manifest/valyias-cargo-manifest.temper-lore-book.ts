import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const valyiasCargoManifest = {
  id: "01a0d5f2-db27-7214-80b6-c3a6f4f44dc1",
  type: "page-type/temper-lore-book",
  slug: "valyias-cargo-manifest",
  title: "Valyia's Cargo Manifest",
  collection: "temper-lore-collection/houses-shops-and-trade",
  esoBookId: 1024,
  bookIndex: 38,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
