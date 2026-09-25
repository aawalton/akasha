import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lycanthropicImmunity = {
  id: "01a0d60b-8108-72e0-8b71-28a6f4659143",
  type: "page-type/temper-lore-book",
  slug: "lycanthropic-immunity",
  title: "Lycanthropic Immunity",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 5773,
  bookIndex: 24,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
