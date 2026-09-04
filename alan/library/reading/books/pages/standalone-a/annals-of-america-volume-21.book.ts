import type { Book } from "../../book.page-type.ts"

export const annalsOfAmericaVolume21 = {
  id: "019db533-f39d-7b8e-ac36-86821e22c3f8",
  pageTypeSlug: "book",
  slug: "annals-of-america-volume-21",
  title: "Annals of America Volume 21",
  kind: "read",
  status: "not-started",
  author: "Encyclopedia Britannica",
  unitSlug: "words",
  position: 21,
  ownLength: 163750,
} as const satisfies Book
