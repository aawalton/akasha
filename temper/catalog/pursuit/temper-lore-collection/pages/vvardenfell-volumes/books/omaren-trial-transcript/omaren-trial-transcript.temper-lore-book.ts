import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const omarenTrialTranscript = {
  id: "01a0d5f7-aa99-7a1b-9970-7ffaac4a054c",
  type: "page-type/temper-lore-book",
  slug: "omaren-trial-transcript",
  title: "Omaren Trial Transcript",
  collection: "temper-lore-collection/vvardenfell-volumes",
  esoBookId: 3990,
  bookIndex: 20,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
