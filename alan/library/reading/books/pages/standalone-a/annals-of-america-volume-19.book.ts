import type { Book } from "../../book.page-type.ts"

export const annalsOfAmericaVolume19 = {
  id: "019db533-f39d-7b41-90ec-534ec4f9b0fc",
  pageTypeSlug: "book",
  slug: "annals-of-america-volume-19",
  title: "Annals of America Volume 19",
  kind: "read",
  status: "not-started",
  unitSlug: "words",
  position: 19,
  ownLength: 107750,
} as const satisfies Book
