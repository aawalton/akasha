import type { Book } from "../../book.page-type.ts"

export const theFoundersConstitutionVolume3 = {
  id: "019db533-f39d-72a9-ac93-a6bac892a22c",
  pageTypeSlug: "book",
  slug: "the-founders-constitution-volume-3",
  title: "The Founders Constitution Volume 3",
  kind: "read",
  status: "not-started",
  author: "Philip B. Kurland, Ralph Lerner",
  unitSlug: "words",
  position: 3,
  ownLength: 145250,
} as const satisfies Book
