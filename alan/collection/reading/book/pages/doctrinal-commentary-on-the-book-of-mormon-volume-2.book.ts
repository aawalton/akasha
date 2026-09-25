import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const doctrinalCommentaryOnTheBookOfMormonVolume2 = {
  id: "019db533-f39d-7453-9b46-80cd2418673c",
  type: "page-type/book",
  slug: "doctrinal-commentary-on-the-book-of-mormon-volume-2",
  title: "Doctrinal Commentary on the Book of Mormon Volume 2",
  status: "completed",
  grade: "C",
  author: "Bible",
  unit: "unit/words",
  position: 2,
  ownLength: 80000,
  ownProgress: 80000,
} as const satisfies Book
