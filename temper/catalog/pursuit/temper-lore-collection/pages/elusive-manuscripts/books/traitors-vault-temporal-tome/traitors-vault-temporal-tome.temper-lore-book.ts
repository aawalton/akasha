import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const traitorsVaultTemporalTome = {
  id: "01a0d60d-d472-7278-bc10-2b53905458b6",
  type: "page-type/temper-lore-book",
  slug: "traitors-vault-temporal-tome",
  title: "Traitor's Vault Temporal Tome",
  collection: "temper-lore-collection/elusive-manuscripts",
  esoBookId: 8411,
  bookIndex: 3,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
