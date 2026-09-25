import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const aComplaintToTheThalmor = {
  id: "01a0d5f3-0ef6-7e08-a2a2-747c322403f1",
  type: "page-type/temper-lore-book",
  slug: "a-complaint-to-the-thalmor",
  title: "A Complaint to the Thalmor",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 1803,
  bookIndex: 69,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
