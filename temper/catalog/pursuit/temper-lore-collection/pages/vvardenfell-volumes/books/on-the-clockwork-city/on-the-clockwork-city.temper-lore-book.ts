import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onTheClockworkCity = {
  id: "01a0d5f7-aa99-711e-b8ee-68894f489e3a",
  type: "page-type/temper-lore-book",
  slug: "on-the-clockwork-city",
  title: "On the Clockwork City",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4554,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
