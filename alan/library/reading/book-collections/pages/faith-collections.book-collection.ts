import type { BookCollection } from "../book-collection.page-type.ts"

export const faithCollections = {
  id: "01a06808-148e-701f-9f30-ad9852389594",
  pageTypeSlug: "book-collection",
  slug: "faith-collections",
  title: "Faith Collections",
  partOfSlugs: ["book-collections"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies BookCollection
