import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const lyranthsLetter = {
  id: "01a0d5f2-253b-7b00-9db7-608d03cee444",
  type: "page-type/temper-lore-book",
  slug: "lyranths-letter",
  title: "Lyranth's Letter",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 6820,
  charted: false,
} as const satisfies TemperLoreBook
