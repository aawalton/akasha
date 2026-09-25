import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const kingdomsFallPeopleWander = {
  id: "01a0d60b-2345-7bd5-a1c5-7c98453851bb",
  type: "page-type/temper-lore-book",
  slug: "kingdoms-fall-people-wander",
  title: "Kingdoms Fall People Wander",
  collection: "temper-lore-collection/anequina-archives",
  esoBookId: 5491,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
