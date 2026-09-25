import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const artOfSmashingVol1 = {
  id: "01a0d60a-d5bc-7296-a90d-d68ddc7f1a88",
  type: "page-type/temper-lore-book",
  slug: "art-of-smashing-vol-1",
  title: "ART OF SMASHING VOL. 1",
  collection: "temper-lore-collection/summerset-scrolls",
  esoBookId: 5104,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
