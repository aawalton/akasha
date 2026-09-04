import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const esther = {
  id: "01a06808-34d9-7022-a7df-b5f2c7367364",
  pageTypeSlug: "scripture-collection",
  slug: "esther",
  title: "Esther",
  partOfSlugs: ["old-testament"],
  position: 17,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "esther",
} as const satisfies ScriptureCollection
