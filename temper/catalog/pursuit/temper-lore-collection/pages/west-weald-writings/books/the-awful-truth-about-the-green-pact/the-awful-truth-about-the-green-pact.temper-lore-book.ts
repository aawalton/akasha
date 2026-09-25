import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const theAwfulTruthAboutTheGreenPact = {
  id: "01a0d60d-4ab0-712d-96a9-7ddaa02fc782",
  type: "page-type/temper-lore-book",
  slug: "the-awful-truth-about-the-green-pact",
  title: "The Awful Truth About the Green Pact",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8013,
  charted: true,
  onBookshelves: true,
  mapCounts: [{ mapId: 2427, mapCount: 1 }],
  positions: "jsonl",
} as const satisfies TemperLoreBook
