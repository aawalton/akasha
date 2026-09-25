import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const balladOfDranothHleran = {
  id: "01a0d5f7-aa98-7df5-95f6-8ee716b5a97d",
  type: "page-type/temper-lore-book",
  slug: "ballad-of-dranoth-hleran",
  title: "Ballad of Dranoth Hleran",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4021,
  bookIndex: 69,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
