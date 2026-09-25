import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const blasiusUnfinishedManuscript = {
  id: "01a0d5f1-c919-7b7b-bda5-29c087ce4643",
  type: "page-type/temper-lore-book",
  slug: "blasius-unfinished-manuscript",
  title: "Blasius' Unfinished Manuscript",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2433,
  bookIndex: 12,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
