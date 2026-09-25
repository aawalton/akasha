import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bewareTheWanderingSpirit = {
  id: "01a0d60d-ff69-7a94-a0f9-1ca8c027e140",
  type: "page-type/temper-lore-book",
  slug: "beware-the-wandering-spirit",
  title: "Beware the Wandering Spirit",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 7881,
  bookIndex: 7,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
