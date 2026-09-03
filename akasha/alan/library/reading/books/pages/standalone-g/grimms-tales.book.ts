import type { Book } from "../../book.page-type.ts"

export const grimmsTales = {
  id: "019db533-f39d-7943-8533-c656edb017e7",
  pageTypeSlug: "book",
  slug: "grimms-tales",
  title: "Grimm's Tales",
  kind: "read",
  status: "paused",
  author: "Gebrüder Grimm [Brothers Grimm]",
  unitSlug: "words",
  position: 3,
  ownLength: 156750,
  ownProgress: 7250,
} as const satisfies Book
