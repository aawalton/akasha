import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const firuthsWritOfEndorsement = {
  id: "01a0d5f7-aa98-72f6-af84-5f509edc3970",
  type: "page-type/temper-lore-book",
  slug: "firuths-writ-of-endorsement",
  title: "Firuth's Writ of Endorsement",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 4046,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
