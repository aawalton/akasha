import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theJournalOfIndringThePatient = {
  id: "01a0d5f4-6f1b-7790-9938-c79a22f213c8",
  type: "page-type/temper-lore-book",
  slug: "the-journal-of-indring-the-patient",
  title: "The Journal of Indring the Patient",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 1213,
  bookIndex: 53,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
