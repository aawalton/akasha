import type { Book } from "akasha/alan/collection/reading/book/book.page-type.types.ts"

export const grimmsTales = {
  id: "019db533-f39d-7943-8533-c656edb017e7",
  type: "page-type/book",
  slug: "grimms-tales",
  title: "Grimm's Tales",
  status: "paused",
  author: "Gebrüder Grimm [Brothers Grimm]",
  unit: "unit/words",
  position: 3,
  ownLength: 156750,
  ownProgress: 7250,
  createdAt: "2026-04-22T12:39:34.045Z",
  updatedAt: "2026-09-25T13:02:31.000Z",
} as const satisfies Book
