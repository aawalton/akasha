import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const thankYouForYourPatience = {
  id: "01a0d5f4-3c13-7c87-9a13-92d3d104377d",
  type: "page-type/temper-lore-book",
  slug: "thank-you-for-your-patience",
  title: "Thank You for Your Patience",
  collection: "temper-lore-collection/notes-and-memos",
  esoBookId: 1576,
  bookIndex: 45,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
