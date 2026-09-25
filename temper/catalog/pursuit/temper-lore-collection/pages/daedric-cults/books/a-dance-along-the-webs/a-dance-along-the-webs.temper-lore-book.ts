import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aDanceAlongTheWebs = {
  id: "01a0d5f2-253a-777e-b0ff-61c5d3b9641a",
  type: "page-type/temper-lore-book",
  slug: "a-dance-along-the-webs",
  title: "A Dance Along the Webs",
  collection: "temper-lore-collection/daedric-cults",
  esoBookId: 7825,
  charted: true,
  quest: 7079,
  positions: "jsonl",
} as const satisfies TemperLoreBook
