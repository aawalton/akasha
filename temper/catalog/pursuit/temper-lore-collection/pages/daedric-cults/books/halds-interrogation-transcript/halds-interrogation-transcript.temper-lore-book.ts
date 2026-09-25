import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const haldsInterrogationTranscript = {
  id: "01a0d5f2-253a-75be-bb00-a806b0aae158",
  type: "page-type/temper-lore-book",
  slug: "halds-interrogation-transcript",
  title: "Hald's Interrogation Transcript",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 1734,
  bookIndex: 61,
  charted: true,
  quest: 4332,
  positions: "jsonl",
} as const satisfies TemperLoreBook
