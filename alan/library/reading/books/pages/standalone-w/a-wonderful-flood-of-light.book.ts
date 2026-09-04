import type { Book } from "../../book.page-type.ts"

export const aWonderfulFloodOfLight = {
  id: "019db533-f39d-736f-aada-13159c00e30e",
  pageTypeSlug: "book",
  slug: "a-wonderful-flood-of-light",
  title: "A Wonderful Flood of Light",
  status: "completed",
  rank: "C",
  author: "Neal A. Maxwell",
  unitSlug: "words",
  position: 4,
  ownLength: 31750,
  ownProgress: 31750,
} as const satisfies Book
