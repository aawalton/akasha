import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const prayerToTheVoskronaGuardians = {
  id: "01a0d60d-708e-7c81-bd4b-a096342de1d1",
  type: "page-type/temper-lore-book",
  slug: "prayer-to-the-voskrona-guardians",
  title: "Prayer to the Voskrona Guardians",
  collection: "temper-lore-collection/dungeon-delver-documents",
  esoBookId: 8473,
  bookIndex: 38,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
