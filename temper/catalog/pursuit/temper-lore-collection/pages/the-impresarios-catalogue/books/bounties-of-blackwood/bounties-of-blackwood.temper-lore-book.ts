import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const bountiesOfBlackwood = {
  id: "01a0d60c-18bd-769d-94f7-daa6c2c062e9",
  type: "page-type/temper-lore-book",
  slug: "bounties-of-blackwood",
  title: "Bounties of Blackwood",
  collection: "temper-lore-collection/the-impresarios-catalogue",
  esoBookId: 6730,
  bookIndex: 3,
  charted: false,
} as const satisfies TemperLoreBook
