import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const journalsVolume4 = {
  id: "019db533-f39d-745b-a8a7-ccab5497396f",
  type: "page-type/book",
  slug: "journals-volume-4",
  title: "Journals Volume 4",
  status: "not-started",
  author: "Charles Ammi Cutter, Library Association",
  unit: "unit/words",
  position: 4,
} as const satisfies Book
