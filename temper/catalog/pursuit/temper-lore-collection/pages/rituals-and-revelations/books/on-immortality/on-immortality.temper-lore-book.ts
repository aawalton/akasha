import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onImmortality = {
  id: "01a0d5f5-444c-7e0b-82df-c332c715875e",
  type: "page-type/temper-lore-book",
  slug: "on-immortality",
  title: "On Immortality",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 1978,
  bookIndex: 73,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
