import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const judges = {
  id: "01a06808-34da-700f-8763-189cfb3fda26",
  pageTypeSlug: "scripture-collection",
  slug: "judges",
  title: "Judges",
  partOfSlugs: ["old-testament"],
  position: 7,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "judges",
} as const satisfies ScriptureCollection
