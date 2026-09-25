import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const hydrikDeepDelvesWitAndWisdom = {
  id: "01a0d60b-8108-7043-a54a-3c6de911c0b9",
  type: "page-type/temper-lore-book",
  slug: "hydrik-deep-delves-wit-and-wisdom",
  title: "Hydrik Deep-Delve's Wit and Wisdom",
  collection: "temper-lore-collection/solitude-soliloquies",
  esoBookId: 6231,
  bookIndex: 42,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
