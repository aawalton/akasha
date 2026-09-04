import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const moses = {
  id: "01a06808-34da-7019-937c-3b9ef503a97e",
  pageTypeSlug: "scripture-collection",
  slug: "moses",
  title: "Moses",
  partOfSlugs: ["pearl-of-great-price"],
  position: 1,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "moses",
} as const satisfies ScriptureCollection
