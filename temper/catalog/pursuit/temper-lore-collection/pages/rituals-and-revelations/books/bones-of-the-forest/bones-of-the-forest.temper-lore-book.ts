import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bonesOfTheForest = {
  id: "01a0d5f5-444b-7e0e-a6c1-dc2819cefc58",
  type: "page-type/temper-lore-book",
  slug: "bones-of-the-forest",
  title: "Bones of the Forest",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 766,
  bookIndex: 20,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
