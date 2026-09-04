import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const leviticus = {
  id: "01a06808-34da-7011-b4d2-294b1f776be4",
  pageTypeSlug: "scripture-collection",
  slug: "leviticus",
  title: "Leviticus",
  partOfSlugs: ["old-testament"],
  position: 3,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "leviticus",
} as const satisfies ScriptureCollection
