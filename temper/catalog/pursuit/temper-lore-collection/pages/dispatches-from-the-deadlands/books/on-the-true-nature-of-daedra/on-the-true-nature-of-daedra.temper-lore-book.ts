import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const onTheTrueNatureOfDaedra = {
  id: "01a0d60c-40c0-7482-93be-2a5a1b976567",
  type: "page-type/temper-lore-book",
  slug: "on-the-true-nature-of-daedra",
  title: "On the True Nature of Daedra",
  collection: "temper-lore-collection/dispatches-from-the-deadlands",
  esoBookId: 6920,
  bookIndex: 48,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
