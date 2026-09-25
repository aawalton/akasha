import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const banditsLetter = {
  id: "01a0d5f7-aa98-7ab3-91bc-2369b64172d2",
  type: "page-type/temper-lore-book",
  slug: "bandits-letter",
  title: "Bandit's Letter",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4426,
  bookIndex: 82,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
