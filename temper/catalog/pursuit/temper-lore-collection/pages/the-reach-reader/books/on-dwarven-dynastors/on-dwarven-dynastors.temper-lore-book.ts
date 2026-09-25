import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onDwarvenDynastors = {
  id: "01a0d60b-c958-7015-8a5e-d8bdc4ea1971",
  type: "page-type/temper-lore-book",
  slug: "on-dwarven-dynastors",
  title: "On Dwarven Dynastors",
  collection: "temper-lore-collection/the-reach-reader",
  esoBookId: 6311,
  bookIndex: 65,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
