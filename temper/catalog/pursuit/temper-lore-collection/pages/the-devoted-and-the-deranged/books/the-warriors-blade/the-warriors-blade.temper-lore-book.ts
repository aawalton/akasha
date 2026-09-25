import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theWarriorsBlade = {
  id: "01a0d5f5-abbb-7692-9176-5fecd925c893",
  type: "page-type/temper-lore-book",
  slug: "the-warriors-blade",
  title: "The Warrior's Blade",
  collection: "temper-lore-collection/the-devoted-and-the-deranged",
  esoBookId: 765,
  bookIndex: 26,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
