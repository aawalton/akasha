import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const mormon = {
  id: "01a06808-34da-7017-a74e-06f5c62d863e",
  pageTypeSlug: "scripture-collection",
  slug: "mormon",
  title: "Mormon",
  partOfSlugs: ["book-of-mormon"],
  position: 13,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "mormon",
} as const satisfies ScriptureCollection
