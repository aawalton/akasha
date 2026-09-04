import type { Book } from "../../book.page-type.ts"

export const herculePoirotsChristmas = {
  id: "019db533-f399-7bc0-9d02-b7cea3822e6c",
  pageTypeSlug: "book",
  slug: "hercule-poirots-christmas",
  title: "Hercule Poirot's Christmas",
  kind: "read",
  status: "not-started",
  author: "Agatha Christie",
  unitSlug: "words",
  position: 17,
} as const satisfies Book
