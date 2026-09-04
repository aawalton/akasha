import type { Book } from "../../book.page-type.ts"

export const theFoundersConstitutionVolume5 = {
  id: "019db533-f39d-72b2-a963-cd4365fff582",
  pageTypeSlug: "book",
  slug: "the-founders-constitution-volume-5",
  title: "The Founders Constitution Volume 5",
  status: "not-started",
  author: "Philip B. Kurland, Ralph Lerner",
  unitSlug: "words",
  position: 5,
  ownLength: 120250,
} as const satisfies Book
