import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const boethiahAndHerAvatars = {
  id: "01a0d5f2-253a-78a7-ad37-32b14a2506aa",
  type: "page-type/temper-lore-book",
  slug: "boethiah-and-her-avatars",
  title: "Boethiah and Her Avatars",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 506,
  bookIndex: 11,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
