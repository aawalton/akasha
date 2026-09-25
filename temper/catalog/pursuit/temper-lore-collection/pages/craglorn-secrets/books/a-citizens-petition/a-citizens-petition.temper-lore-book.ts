import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aCitizensPetition = {
  id: "01a0d5f1-c918-73bc-b259-cc29fdcf08d6",
  type: "page-type/temper-lore-book",
  slug: "a-citizens-petition",
  title: "A Citizen's Petition",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2606,
  bookIndex: 34,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
