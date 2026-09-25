import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const trackingTheArena = {
  id: "01a0d5f1-c91b-7057-8233-e038b615918f",
  type: "page-type/temper-lore-book",
  slug: "tracking-the-arena",
  title: "Tracking the Arena",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2746,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
