import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const oblivionGatewayInstructions = {
  id: "01a0d60c-eb9c-7e2b-b906-587453e0d30f",
  type: "page-type/temper-lore-book",
  slug: "oblivion-gateway-instructions",
  title: "Oblivion Gateway Instructions",
  collection: "temper-lore-collection/telvanni-tomes",
  esoBookId: 7670,
  bookIndex: 19,
  charted: true,
  quest: 6974,
  positions: "jsonl",
} as const satisfies TemperLoreBook
