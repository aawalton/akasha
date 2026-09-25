import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const spellwrightsNote = {
  id: "01a0d60d-4ab0-78bc-8831-a37290f282b4",
  type: "page-type/temper-lore-book",
  slug: "spellwrights-note",
  title: "Spellwright's Note",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8131,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
