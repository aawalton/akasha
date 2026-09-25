import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const fjarsInterrogationTranscript = {
  id: "01a0d5f1-f451-7973-955a-3b21d414493f",
  type: "page-type/temper-lore-book",
  slug: "fjars-interrogation-transcript",
  title: "Fjar's Interrogation Transcript",
  collection: "temper-lore-collection/criminal-correspondence",
  esoBookId: 1667,
  bookIndex: 64,
  charted: true,
  quest: 4332,
  positions: "jsonl",
} as const satisfies TemperLoreBook
