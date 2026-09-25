import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const cloudrestSecretEntrance = {
  id: "01a0d60a-d5bc-7928-8aca-ef09002866ff",
  type: "page-type/temper-lore-book",
  slug: "cloudrest-secret-entrance",
  title: "Cloudrest Secret Entrance",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 5056,
  bookIndex: 56,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
