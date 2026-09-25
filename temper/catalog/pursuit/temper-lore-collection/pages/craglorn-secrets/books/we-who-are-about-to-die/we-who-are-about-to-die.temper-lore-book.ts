import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const weWhoAreAboutToDie = {
  id: "01a0d5f1-c91c-7135-8008-982b52b337db",
  type: "page-type/temper-lore-book",
  slug: "we-who-are-about-to-die",
  title: "We Who Are About To Die",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2743,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
