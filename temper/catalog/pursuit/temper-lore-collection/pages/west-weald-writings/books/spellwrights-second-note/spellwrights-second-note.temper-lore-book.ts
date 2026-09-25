import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const spellwrightsSecondNote = {
  id: "01a0d60d-4ab0-7ba0-bd3c-9f1ad5697019",
  type: "page-type/temper-lore-book",
  slug: "spellwrights-second-note",
  title: "Spellwright's Second Note",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8132,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
