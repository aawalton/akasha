import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tamrielicArtifactsPartOne = {
  id: "01a0d5e3-d583-75ed-9537-0742cbff7395",
  type: "page-type/temper-lore-book",
  slug: "tamrielic-artifacts-part-one",
  title: "Tamrielic Artifacts, Part One",
  collection: "temper-lore-collection/legends-of-nirn",
  bookIndex: 8,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
