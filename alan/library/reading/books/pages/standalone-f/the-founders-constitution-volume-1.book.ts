import type { Book } from "../../book.page-type.ts"

export const theFoundersConstitutionVolume1 = {
  id: "019db533-f39d-73d4-9357-cfe8f7530893",
  pageTypeSlug: "book",
  slug: "the-founders-constitution-volume-1",
  title: "The Founders Constitution Volume 1",
  status: "not-started",
  author: "Philip B. Kurland, Ralph Lerner",
  unitSlug: "words",
  position: 1,
  ownLength: 173000,
} as const satisfies Book
