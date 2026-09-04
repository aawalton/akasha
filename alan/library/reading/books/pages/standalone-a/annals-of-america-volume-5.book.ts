import type { Book } from "../../book.page-type.ts"

export const annalsOfAmericaVolume5 = {
  id: "019db533-f39d-7b7f-8fc9-6930f0a37683",
  pageTypeSlug: "book",
  slug: "annals-of-america-volume-5",
  title: "Annals of America Volume 5",
  status: "not-started",
  author: "Editors",
  unitSlug: "words",
  position: 5,
  ownLength: 148250,
} as const satisfies Book
