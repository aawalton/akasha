import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const journalOfAdosiFevur = {
  id: "01a0d5f8-02f8-7bc8-873e-160849c7ad30",
  type: "page-type/temper-lore-book",
  slug: "journal-of-adosi-fevur",
  title: "Journal of Adosi Fevur",
  collection: "temper-lore-collection/library-of-incunabula",
  esoBookId: 7351,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
