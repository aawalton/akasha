import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ashlanderTribesAndCustoms = {
  id: "01a0d5f7-aa98-7887-a92b-40807e46f764",
  type: "page-type/temper-lore-book",
  slug: "ashlander-tribes-and-customs",
  title: "Ashlander Tribes and Customs",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4547,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
