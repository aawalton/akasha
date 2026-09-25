import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const seekingTenant = {
  id: "01a0d5f2-83a3-7ebc-8b4e-10496daf7a23",
  type: "page-type/temper-lore-book",
  slug: "seeking-tenant",
  title: "Seeking Tenant!",
  collection: "temper-lore-collection/handbills-posters-and-decrees",
  esoBookId: 4810,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
