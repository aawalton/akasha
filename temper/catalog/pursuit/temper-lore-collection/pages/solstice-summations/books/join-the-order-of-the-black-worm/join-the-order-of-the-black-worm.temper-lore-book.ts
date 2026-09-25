import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const joinTheOrderOfTheBlackWorm = {
  id: "01a0d60d-ff69-7ee4-9a87-51285af871f7",
  type: "page-type/temper-lore-book",
  slug: "join-the-order-of-the-black-worm",
  title: "Join the Order of the Black Worm!",
  collection: "temper-lore-collection/solstice-summations",
  esoBookId: 8280,
  bookIndex: 52,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
