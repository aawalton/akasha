import type { Book } from "../../book.page-type.ts"

export const janeEyre = {
  id: "019db533-f39d-7ac7-b6bb-cbfa4f9b1349",
  pageTypeSlug: "book",
  slug: "jane-eyre",
  title: "Jane Eyre",
  kind: "read",
  status: "not-started",
  author: "Charlotte Brontë",
  unitSlug: "words",
  position: 9,
  ownLength: 107750,
} as const satisfies Book
