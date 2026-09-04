import type { Book } from "../../book.page-type.ts"

export const donQuixoteDeLaMancha = {
  id: "019db533-f39d-7b13-9e1a-799676c191f1",
  pageTypeSlug: "book",
  slug: "don-quixote-de-la-mancha",
  title: "Don Quixote de la Mancha",
  status: "not-started",
  author: "Miguel de Cervantes Saavedra",
  unitSlug: "words",
  position: 11,
  ownLength: 156250,
} as const satisfies Book
