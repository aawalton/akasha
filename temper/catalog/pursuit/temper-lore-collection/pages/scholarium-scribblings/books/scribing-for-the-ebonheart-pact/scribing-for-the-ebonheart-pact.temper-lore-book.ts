import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const scribingForTheEbonheartPact = {
  id: "01a0d60d-9a64-73f5-9713-743a97176cb1",
  type: "page-type/temper-lore-book",
  slug: "scribing-for-the-ebonheart-pact",
  title: "Scribing for the Ebonheart Pact",
  collection: "temper-lore-collection/scholarium-scribblings",
  esoBookId: 8296,
  bookIndex: 70,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
