import type { Book } from "../../book.page-type.ts"

export const annalsOfAmericaVolume14 = {
  id: "019db533-f39d-7c0f-b0ce-1b78405833b7",
  pageTypeSlug: "book",
  slug: "annals-of-america-volume-14",
  title: "Annals of America Volume 14",
  kind: "read",
  status: "not-started",
  author: "Annals",
  unitSlug: "words",
  position: 14,
  ownLength: 153500,
} as const satisfies Book
