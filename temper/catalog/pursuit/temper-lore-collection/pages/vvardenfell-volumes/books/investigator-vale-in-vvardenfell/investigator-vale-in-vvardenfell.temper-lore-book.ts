import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const investigatorValeInVvardenfell = {
  id: "01a0d5f7-aa99-7a44-aca6-30565b31c88b",
  type: "page-type/temper-lore-book",
  slug: "investigator-vale-in-vvardenfell",
  title: "Investigator Vale in Vvardenfell",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 3955,
  bookIndex: 1,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
