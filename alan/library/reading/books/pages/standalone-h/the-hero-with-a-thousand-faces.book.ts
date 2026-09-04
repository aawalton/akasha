import type { Book } from "../../book.page-type.ts"

export const theHeroWithAThousandFaces = {
  id: "019db533-f39d-7edf-955f-da21087c9ab3",
  pageTypeSlug: "book",
  slug: "the-hero-with-a-thousand-faces",
  title: "The Hero with a Thousand Faces",
  status: "not-started",
  author: "Joseph Campbell",
  unitSlug: "words",
  ownLength: 219300,
} as const satisfies Book
