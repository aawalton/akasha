import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const evelisSpeechIdeas = {
  id: "01a0d60c-40c0-704f-a104-2cb5d5f4364b",
  type: "page-type/temper-lore-book",
  slug: "evelis-speech-ideas",
  title: "Eveli's Speech Ideas",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6928,
  bookIndex: 64,
  charted: true,
  quest: 6693,
  positions: "jsonl",
} as const satisfies TemperLoreBook
