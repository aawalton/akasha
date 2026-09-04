import type { BookCollection } from "../book-collection.page-type.ts"

export const annalsOfAmerica = {
  id: "01a06808-148e-7003-9480-92d4b7b0ba76",
  pageTypeSlug: "book-collection",
  slug: "annals-of-america",
  title: "Annals of America",
  partOfSlugs: ["history-collections"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "paused",
} as const satisfies BookCollection
