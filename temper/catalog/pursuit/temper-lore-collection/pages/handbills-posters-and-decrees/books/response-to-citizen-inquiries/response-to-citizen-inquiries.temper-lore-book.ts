import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const responseToCitizenInquiries = {
  id: "01a0d5f2-83a3-783d-b250-72b7007e2ff5",
  type: "page-type/temper-lore-book",
  slug: "response-to-citizen-inquiries",
  title: "Response to Citizen Inquiries",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 2950,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
