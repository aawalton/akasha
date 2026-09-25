import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const notesOnTheVaultDoor = {
  id: "01a0d5f5-1385-764a-b261-d8e73a59124e",
  type: "page-type/temper-lore-book",
  slug: "notes-on-the-vault-door",
  title: "Notes on the Vault Door",
  collection: "temper-lore-collection/research-notes",
  esoBookId: 2065,
  bookIndex: 81,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
