import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const romans = {
  id: "01a06808-34da-7029-bd21-07fbe8fd8c43",
  pageTypeSlug: "scripture-collection",
  slug: "romans",
  title: "Romans",
  partOfSlugs: ["new-testament"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "romans",
} as const satisfies ScriptureCollection
