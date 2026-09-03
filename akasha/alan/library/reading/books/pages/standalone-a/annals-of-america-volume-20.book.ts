import type { Book } from "../../book.page-type.ts"

export const annalsOfAmericaVolume20 = {
  id: "019db533-f39d-7bff-97e3-60af507766cf",
  pageTypeSlug: "book",
  slug: "annals-of-america-volume-20",
  title: "Annals of America Volume 20",
  kind: "read",
  status: "not-started",
  unitSlug: "words",
  position: 20,
  ownLength: 94250,
} as const satisfies Book
