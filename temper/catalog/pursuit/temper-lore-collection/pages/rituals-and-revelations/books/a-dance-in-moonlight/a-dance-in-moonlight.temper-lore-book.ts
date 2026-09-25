import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aDanceInMoonlight = {
  id: "01a0d5f5-444a-7eaf-b482-032187bd4df0",
  type: "page-type/temper-lore-book",
  slug: "a-dance-in-moonlight",
  title: "A Dance in Moonlight",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 2010,
  bookIndex: 77,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
