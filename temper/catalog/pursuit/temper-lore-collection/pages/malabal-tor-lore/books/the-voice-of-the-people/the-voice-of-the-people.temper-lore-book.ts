import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theVoiceOfThePeople = {
  id: "01a0d5e4-74e1-70f4-a9ed-1c5ae0350b61",
  type: "page-type/temper-lore-book",
  slug: "the-voice-of-the-people",
  title: "The Voice of the People",
  collection: "temper-lore-collection/malabal-tor-lore",
  bookIndex: 1,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
