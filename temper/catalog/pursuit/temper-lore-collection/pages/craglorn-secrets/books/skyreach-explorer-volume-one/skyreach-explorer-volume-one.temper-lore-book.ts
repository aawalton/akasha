import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const skyreachExplorerVolumeOne = {
  id: "01a0d5f1-c91b-7db4-9eeb-a3c50d8ff68f",
  type: "page-type/temper-lore-book",
  slug: "skyreach-explorer-volume-one",
  title: "Skyreach Explorer, Volume One",
  collection: "temper-lore-collection/craglorn-secrets",
  esoBookId: 2677,
  bookIndex: 65,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
