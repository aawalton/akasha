import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ayleidSurvivalsInValenwood = {
  id: "01a0d5e4-d87c-7834-9606-b67a46aa4c4b",
  type: "page-type/temper-lore-book",
  slug: "ayleid-survivals-in-valenwood",
  title: "Ayleid Survivals in Valenwood",
  collection: "temper-lore-collection/grahtwood-lore",
  bookIndex: 7,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
