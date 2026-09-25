import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const prayerToMyPrince = {
  id: "01a0d5f5-444c-75f8-98a2-f7ba8fba5670",
  type: "page-type/temper-lore-book",
  slug: "prayer-to-my-prince",
  title: "Prayer to My Prince",
  collection: "temper-lore-collection/rituals-and-revelations",
  esoBookId: 2473,
  bookIndex: 84,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
