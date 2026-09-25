import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thalmorDiplomaticCorpsNotice = {
  id: "01a0d5f2-83a3-784b-91aa-8e98cf54ed52",
  type: "page-type/temper-lore-book",
  slug: "thalmor-diplomatic-corps-notice",
  title: "Thalmor Diplomatic Corps Notice",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 706,
  bookIndex: 17,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
