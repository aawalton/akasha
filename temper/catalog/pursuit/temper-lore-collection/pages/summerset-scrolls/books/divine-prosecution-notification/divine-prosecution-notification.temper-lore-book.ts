import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const divineProsecutionNotification = {
  id: "01a0d60a-d5bc-7905-9486-1b0e2f7b0b33",
  type: "page-type/temper-lore-book",
  slug: "divine-prosecution-notification",
  title: "Divine Prosecution Notification",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 4923,
  bookIndex: 24,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
