import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theArtAndTheMadnessV1 = {
  id: "01a0d5f5-444c-7ac1-934e-8e14aaa9a8c4",
  type: "page-type/temper-lore-book",
  slug: "the-art-and-the-madness-v-1",
  title: "The Art and the Madness v.1",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 562,
  bookIndex: 12,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
