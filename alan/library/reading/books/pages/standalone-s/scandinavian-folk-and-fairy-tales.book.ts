import type { Book } from "../../book.page-type.ts"

export const scandinavianFolkAndFairyTales = {
  id: "019db533-f39d-7970-b922-d5109abe4f80",
  pageTypeSlug: "book",
  slug: "scandinavian-folk-and-fairy-tales",
  title: "Scandinavian Folk & Fairy Tales",
  status: "not-started",
  author: "Claire Booss",
  unitSlug: "words",
  position: 1,
  ownLength: 166500,
} as const satisfies Book
