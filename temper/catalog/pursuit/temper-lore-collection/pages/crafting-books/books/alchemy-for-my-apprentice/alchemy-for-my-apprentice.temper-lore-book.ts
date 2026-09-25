import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const alchemyForMyApprentice = {
  id: "01a0d5e6-c6d4-701d-ab6b-8f4695b45534",
  type: "page-type/temper-lore-book",
  slug: "alchemy-for-my-apprentice",
  title: "Alchemy For My Apprentice",
  collection: "temper-lore-collection/crafting-books",
  bookIndex: 21,
} as const satisfies TemperLoreBook
