import type { TemperLoreBook } from "akasha/temper/catalog/pursuit/temper-lore-collection/temper-lore-book/temper-lore-book.page-type.types.ts"

export const northernHeartlandsJournal = {
  id: "01a0d5f4-6f1b-7227-995d-d95e060cb60c",
  type: "page-type/temper-lore-book",
  slug: "northern-heartlands-journal",
  title: "Northern Heartlands Journal",
  collection: "temper-lore-collection/personal-journals",
  esoBookId: 556,
  bookIndex: 20,
  charted: true,
  positions: "jsonl",
} as const satisfies TemperLoreBook
