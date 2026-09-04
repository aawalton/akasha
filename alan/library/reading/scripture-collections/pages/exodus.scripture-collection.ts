import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const exodus = {
  id: "01a06808-34d9-7024-818f-56a89c43170d",
  pageTypeSlug: "scripture-collection",
  slug: "exodus",
  title: "Exodus",
  partOfSlugs: ["old-testament"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "exodus",
} as const satisfies ScriptureCollection
