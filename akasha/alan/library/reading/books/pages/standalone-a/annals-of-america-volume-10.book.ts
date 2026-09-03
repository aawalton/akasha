import type { Book } from "../../book.page-type.ts"

export const annalsOfAmericaVolume10 = {
  id: "019db533-f39d-7bb6-8688-1a5523fb3478",
  pageTypeSlug: "book",
  slug: "annals-of-america-volume-10",
  title: "Annals of America Volume 10",
  kind: "read",
  status: "not-started",
  author: "willian benton",
  unitSlug: "words",
  position: 10,
  ownLength: 151500,
} as const satisfies Book
