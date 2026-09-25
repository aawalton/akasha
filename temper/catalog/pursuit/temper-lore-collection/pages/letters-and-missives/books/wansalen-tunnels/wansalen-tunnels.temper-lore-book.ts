import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const wansalenTunnels = {
  id: "01a0d5f3-0ef9-7e63-83f6-16516ddb078a",
  type: "page-type/temper-lore-book",
  slug: "wansalen-tunnels",
  title: "Wansalen Tunnels",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1314,
  bookIndex: 49,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
