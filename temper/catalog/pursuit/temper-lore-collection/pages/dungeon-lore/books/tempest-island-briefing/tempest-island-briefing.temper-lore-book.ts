import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tempestIslandBriefing = {
  id: "01a0d5e3-aaa1-7bf9-b978-ad5cdaef3e56",
  type: "page-type/temper-lore-book",
  slug: "tempest-island-briefing",
  title: "Tempest Island Briefing",
  collection: "temper-lore-collection/dungeon-lore",
  bookIndex: 14,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
