import type { BookCollection } from "../book-collection.page-type.ts"

export const theFoundersConstitution = {
  id: "01a06808-148f-7023-9561-14566d950ca7",
  pageTypeSlug: "book-collection",
  slug: "the-founders-constitution",
  title: "The Founders Constitution",
  partOfSlugs: ["commentaries"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies BookCollection
