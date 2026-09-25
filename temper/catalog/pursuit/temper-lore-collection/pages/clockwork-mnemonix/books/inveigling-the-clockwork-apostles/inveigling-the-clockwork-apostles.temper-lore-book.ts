import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const inveiglingTheClockworkApostles = {
  id: "01a0d60a-a213-7422-a2e5-93129f766608",
  type: "page-type/temper-lore-book",
  slug: "inveigling-the-clockwork-apostles",
  title: "Inveigling the Clockwork Apostles",
  collection: "temper-lore-collection/clockwork-mnemonix",
  esoBookId: 4601,
  bookIndex: 12,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
