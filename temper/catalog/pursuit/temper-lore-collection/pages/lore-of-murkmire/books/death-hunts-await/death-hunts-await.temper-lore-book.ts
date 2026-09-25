import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const deathHuntsAwait = {
  id: "01a0d5f6-a299-7006-a961-857ce58e79f5",
  type: "page-type/temper-lore-book",
  slug: "death-hunts-await",
  title: "Death-Hunts Await",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5299,
  bookIndex: 52,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
