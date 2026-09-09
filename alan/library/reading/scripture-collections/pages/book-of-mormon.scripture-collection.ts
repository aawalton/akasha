import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const bookOfMormon = {
  id: "01a06808-34d9-701a-98c7-0aeb69cef05d",
  pageTypeSlug: "scripture-collection",
  type: "scripture-collection",
  slug: "book-of-mormon",
  title: "Book of Mormon",
  partOfCollections: ["scriptures"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalId: "bookofmormon",
} as const satisfies ScriptureCollection
