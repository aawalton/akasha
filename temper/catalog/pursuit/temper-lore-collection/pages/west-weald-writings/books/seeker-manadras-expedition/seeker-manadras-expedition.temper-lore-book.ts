import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const seekerManadrasExpedition = {
  id: "01a0d60d-4ab0-7ee6-9357-df9ed1edb409",
  type: "page-type/temper-lore-book",
  slug: "seeker-manadras-expedition",
  title: "Seeker Manadra's Expedition",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8052,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
