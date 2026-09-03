import type { BookCollection } from "../book-collection.page-type.ts"

export const superintendentBattle = {
  id: "01a06808-148f-7012-aadf-3a0e057b5585",
  pageTypeSlug: "book-collection",
  slug: "superintendent-battle",
  title: "Superintendent Battle",
  partOfSlugs: ["agatha-christie"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies BookCollection
