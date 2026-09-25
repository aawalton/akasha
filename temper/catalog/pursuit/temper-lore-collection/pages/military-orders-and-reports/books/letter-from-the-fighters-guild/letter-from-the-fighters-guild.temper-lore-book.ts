import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterFromTheFightersGuild = {
  id: "01a0d5f3-7053-708f-a3d6-14fcbb17feb5",
  type: "page-type/temper-lore-book",
  slug: "letter-from-the-fighters-guild",
  title: "Letter from the Fighters Guild!",
  collection: "temper-lore-collection/military-orders-and-reports",
  esoBookId: 8462,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
