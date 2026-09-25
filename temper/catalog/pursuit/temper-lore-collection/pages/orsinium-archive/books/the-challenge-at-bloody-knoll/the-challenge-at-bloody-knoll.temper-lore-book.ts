import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theChallengeAtBloodyKnoll = {
  id: "01a0d5f7-160b-7502-aee1-04044f0378ed",
  type: "page-type/temper-lore-book",
  slug: "the-challenge-at-bloody-knoll",
  title: "The Challenge at Bloody Knoll",
  collection: "temper-lore-collection/orsinium-archive",
  esoBookId: 2837,
  bookIndex: 35,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
