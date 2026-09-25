import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const withRegardsToTheEbonyBlade = {
  id: "01a0d5e3-aaa1-70f9-a1e0-73896161d7da",
  type: "page-type/temper-lore-book",
  slug: "with-regards-to-the-ebony-blade",
  title: "With Regards to the Ebony Blade",
  collection: "temper-lore-collection/dungeon-lore",
  bookIndex: 1,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
