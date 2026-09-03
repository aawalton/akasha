import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const alma = {
  id: "01a06808-34d9-7017-898d-9e53d4485c8b",
  pageTypeSlug: "scripture-collection",
  slug: "alma",
  title: "Alma",
  partOfSlugs: ["book-of-mormon"],
  position: 9,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "alma",
} as const satisfies ScriptureCollection
