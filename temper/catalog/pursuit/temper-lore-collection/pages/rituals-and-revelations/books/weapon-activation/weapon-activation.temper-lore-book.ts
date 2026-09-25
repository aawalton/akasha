import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const weaponActivation = {
  id: "01a0d5f5-444d-7c3a-b58f-ae33e60688c8",
  type: "page-type/temper-lore-book",
  slug: "weapon-activation",
  title: "Weapon Activation",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 976,
  bookIndex: 33,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
