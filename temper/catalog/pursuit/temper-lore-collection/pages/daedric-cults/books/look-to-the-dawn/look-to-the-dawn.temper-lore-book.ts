import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lookToTheDawn = {
  id: "01a0d5f2-253b-7eba-9363-5699112834c3",
  type: "page-type/temper-lore-book",
  slug: "look-to-the-dawn",
  title: "Look to the Dawn",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 1224,
  bookIndex: 47,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
