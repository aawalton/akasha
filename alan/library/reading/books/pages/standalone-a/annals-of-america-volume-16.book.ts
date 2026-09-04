import type { Book } from "../../book.page-type.ts"

export const annalsOfAmericaVolume16 = {
  id: "019db533-f39d-7b58-870d-0c6d9d030096",
  pageTypeSlug: "book",
  slug: "annals-of-america-volume-16",
  title: "Annals of America Volume 16",
  kind: "read",
  status: "not-started",
  unitSlug: "words",
  position: 16,
  ownLength: 155000,
} as const satisfies Book
