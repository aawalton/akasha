import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const newTestament = {
  id: "01a06808-34da-701d-8248-9d0ef033be7f",
  pageTypeSlug: "scripture-collection",
  slug: "new-testament",
  title: "New Testament",
  partOfSlugs: ["scriptures"],
  position: 2,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "newtestament",
} as const satisfies ScriptureCollection
