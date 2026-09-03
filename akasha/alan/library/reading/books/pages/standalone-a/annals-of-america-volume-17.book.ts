import type { Book } from "../../book.page-type.ts"

export const annalsOfAmericaVolume17 = {
  id: "019db533-f39d-7b2a-ace6-c3054bb2a9c7",
  pageTypeSlug: "book",
  slug: "annals-of-america-volume-17",
  title: "Annals of America Volume 17",
  kind: "read",
  status: "not-started",
  author: "Encyclopedia Britannica",
  unitSlug: "words",
  position: 17,
  ownLength: 147750,
} as const satisfies Book
