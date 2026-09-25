import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aFreeArgoniansManifesto = {
  id: "01a0d5f2-83a1-7978-b78e-a14c6aa600df",
  type: "page-type/temper-lore-book",
  slug: "a-free-argonians-manifesto",
  title: "A Free Argonian's Manifesto",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 145,
  bookIndex: 2,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
