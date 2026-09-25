import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const ayleidCitiesOfValenwood = {
  id: "01a0d5e4-74e1-731e-9620-42ff0515c26d",
  type: "page-type/temper-lore-book",
  slug: "ayleid-cities-of-valenwood",
  title: "Ayleid Cities of Valenwood",
  collection: "temper-lore-collection/malabal-tor-lore",
  bookIndex: 10,
  shalidorPins: "jsonl",
} as const satisfies TemperLoreBook
