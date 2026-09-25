import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const facultyApplication = {
  id: "01a0d5f3-0ef7-7b2c-b4f5-e14ee9a9ff45",
  type: "page-type/temper-lore-book",
  slug: "faculty-application",
  title: "Faculty Application",
  collection: "temper-lore-collection/letters-and-missives",
  esoBookId: 640,
  bookIndex: 16,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
