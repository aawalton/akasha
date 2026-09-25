import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const tamrielicArtifactsPartTwo = {
  id: "01a0d5e3-d583-75e1-aca8-862a04be6f2b",
  type: "page-type/temper-lore-book",
  slug: "tamrielic-artifacts-part-two",
  title: "Tamrielic Artifacts, Part Two",
  collection: "temper-lore-collection/legends-of-nirn",
  bookIndex: 9,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
