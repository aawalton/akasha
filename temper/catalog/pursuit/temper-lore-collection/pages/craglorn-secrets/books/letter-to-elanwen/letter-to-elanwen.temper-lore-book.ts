import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const letterToElanwen = {
  id: "01a0d5f1-c91a-7458-8706-fb3a0fd6bb37",
  type: "page-type/temper-lore-book",
  slug: "letter-to-elanwen",
  title: "Letter to Elanwen",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2736,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
