import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const researchOfSaloraAdlaron = {
  id: "01a0d60d-4ab0-7024-86da-71d61ca1cf1f",
  type: "page-type/temper-lore-book",
  slug: "research-of-salora-adlaron",
  title: "Research of Salora Adlaron",
  collection: "temper-lore-collection/west-weald-writings",
  esoBookId: 8050,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
