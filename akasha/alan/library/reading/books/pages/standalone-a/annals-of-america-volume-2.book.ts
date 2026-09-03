import type { Book } from "../../book.page-type.ts"

export const annalsOfAmericaVolume2 = {
  id: "019db533-f39d-7b95-a253-e09878f82705",
  pageTypeSlug: "book",
  slug: "annals-of-america-volume-2",
  title: "Annals of America Volume 2",
  kind: "read",
  status: "paused",
  author: "Mortimer J. (editor) Adler",
  unitSlug: "words",
  position: 2,
  ownLength: 154750,
  ownProgress: 25750,
} as const satisfies Book
