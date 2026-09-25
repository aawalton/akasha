import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const crumblingBretonScroll = {
  id: "01a0d5f5-444b-7f24-8872-fed88a13b5a3",
  type: "page-type/temper-lore-book",
  slug: "crumbling-breton-scroll",
  title: "Crumbling Breton Scroll",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 1379,
  bookIndex: 46,
  charted: true,
  quest: 4468,
  positions: "jsonl",
} as const satisfies TemperLoreBook
