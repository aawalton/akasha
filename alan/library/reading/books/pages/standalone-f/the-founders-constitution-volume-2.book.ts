import type { Book } from "../../book.page-type.ts"

export const theFoundersConstitutionVolume2 = {
  id: "019db533-f39d-73a4-8aa4-454828871090",
  pageTypeSlug: "book",
  slug: "the-founders-constitution-volume-2",
  title: "The Founders Constitution Volume 2",
  status: "not-started",
  author: "Philip B. Kurland, Ralph Lerner",
  unitSlug: "words",
  position: 2,
  ownLength: 162250,
} as const satisfies Book
