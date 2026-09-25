import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bonnieSprigganLogbook = {
  id: "01a0d60e-45b2-70d5-9082-d4a10abd45cb",
  type: "page-type/temper-lore-book",
  slug: "bonnie-spriggan-logbook",
  title: "Bonnie Spriggan Logbook",
  collection: "temper-lore-collection/solstice-summations-part-2",
  esoBookId: 8596,
  bookIndex: 30,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
