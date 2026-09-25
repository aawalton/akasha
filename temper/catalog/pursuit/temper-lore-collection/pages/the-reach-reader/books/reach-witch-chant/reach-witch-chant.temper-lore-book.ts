import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const reachWitchChant = {
  id: "01a0d60b-c958-7161-9cbf-871e88b6c563",
  type: "page-type/temper-lore-book",
  slug: "reach-witch-chant",
  title: "Reach Witch Chant",
  collection: "temper-lore-collection/the-reach-reader",
  esoBookId: 6362,
  bookIndex: 3,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
