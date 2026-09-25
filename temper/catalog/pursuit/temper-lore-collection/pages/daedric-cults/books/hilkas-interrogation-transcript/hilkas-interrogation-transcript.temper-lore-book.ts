import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const hilkasInterrogationTranscript = {
  id: "01a0d5f2-253a-7a7c-916c-46444c1e645d",
  type: "page-type/temper-lore-book",
  slug: "hilkas-interrogation-transcript",
  title: "Hilka's Interrogation Transcript",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 1735,
  bookIndex: 62,
  charted: true,
  quest: 4332,
  positions: "jsonl",
} as const satisfies TemperLoreBook
