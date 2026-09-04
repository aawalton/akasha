import type { Book } from "../../book.page-type.ts"

export const crystalSinger = {
  id: "019db533-f399-7dd5-bc3f-f10de43d9b55",
  pageTypeSlug: "book",
  slug: "crystal-singer",
  title: "Crystal Singer",
  status: "not-started",
  author: "Anne McCaffrey",
  unitSlug: "words",
} as const satisfies Book
