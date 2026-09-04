import type { Book } from "../../book.page-type.ts"

export const brainStorms = {
  id: "019db533-f39e-7103-8d1b-10abc7b5b453",
  pageTypeSlug: "book",
  slug: "brain-storms",
  title: "Brain Storms",
  status: "not-started",
  author: "Jon Palfreman",
  unitSlug: "words",
  ownLength: 118050,
} as const satisfies Book
