import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const cyrodilicCollectionsNeedsYou = {
  id: "01a0d5f6-a299-748a-a738-c23cc122edc7",
  type: "page-type/temper-lore-book",
  slug: "cyrodilic-collections-needs-you",
  title: "Cyrodilic Collections Needs You!",
  collection: "temper-lore-collection/lore-of-murkmire",
  esoBookId: 5190,
  bookIndex: 45,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
