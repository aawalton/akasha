import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const summonsToTheRemnant = {
  id: "01a0d5f2-253b-7b27-b678-f80b6f864d4d",
  type: "page-type/temper-lore-book",
  slug: "summons-to-the-remnant",
  title: "Summons to the Remnant",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 8389,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
