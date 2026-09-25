import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const euraxianNecromancers = {
  id: "01a0d60b-2344-7d9e-b717-d98df86da6aa",
  type: "page-type/temper-lore-book",
  slug: "euraxian-necromancers",
  title: "Euraxian Necromancers",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5663,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
