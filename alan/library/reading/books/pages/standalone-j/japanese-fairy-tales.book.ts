import type { Book } from "../../book.page-type.ts"

export const japaneseFairyTales = {
  id: "019db533-f39d-7a98-958a-4b0ff572c0ba",
  pageTypeSlug: "book",
  slug: "japanese-fairy-tales",
  title: "Japanese Fairy Tales",
  kind: "read",
  status: "completed",
  rank: "C",
  author: "Yei Theodora Ozaki",
  unitSlug: "words",
  position: 5,
  ownLength: 70250,
  ownProgress: 70250,
} as const satisfies Book
