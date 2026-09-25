import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const turosCargoManifest = {
  id: "01a0d60b-4e03-75ce-a0a3-082c9b7ba0df",
  type: "page-type/temper-lore-book",
  slug: "turos-cargo-manifest",
  title: "Turo's Cargo Manifest",
  collection: "temper-lore-collection/pellitine-postings",
  esoBookId: 5705,
  bookIndex: 76,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
