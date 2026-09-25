import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const eyeOfZthenganaz = {
  id: "01a0d5f6-d68a-77c9-869a-5b51e86bc29c",
  type: "page-type/temper-lore-book",
  slug: "eye-of-zthenganaz",
  title: "Eye of Zthenganaz",
  collection: "temper-lore-collection/wrothgar-writings",
  esoBookId: 3126,
  bookIndex: 45,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
