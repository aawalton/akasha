import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aWerewolfHuntersAdvice = {
  id: "01a0d5f1-c919-70b4-8136-8e9785af695b",
  type: "page-type/temper-lore-book",
  slug: "a-werewolf-hunters-advice",
  title: "A Werewolf Hunter's Advice",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2612,
  bookIndex: 40,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
