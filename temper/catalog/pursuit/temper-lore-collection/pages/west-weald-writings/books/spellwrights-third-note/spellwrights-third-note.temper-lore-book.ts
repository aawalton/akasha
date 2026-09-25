import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const spellwrightsThirdNote = {
  id: "01a0d60d-4ab0-7e94-8faa-5e67755a2544",
  type: "page-type/temper-lore-book",
  slug: "spellwrights-third-note",
  title: "Spellwright's Third Note",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8133,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
