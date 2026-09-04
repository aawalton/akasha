import type { Book } from "../../book.page-type.ts"

export const hansChristianAnderson = {
  id: "019db533-f39d-79e3-8734-9af28808e7f5",
  pageTypeSlug: "book",
  slug: "hans-christian-anderson",
  title: "Hans Christian Anderson",
  status: "paused",
  author: "Hans Christian Andersen",
  unitSlug: "words",
  position: 4,
  ownLength: 274000,
  ownProgress: 56250,
} as const satisfies Book
