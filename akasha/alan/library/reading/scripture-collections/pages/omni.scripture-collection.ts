import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const omni = {
  id: "01a06808-34da-7022-b317-aa602ba087c3",
  pageTypeSlug: "scripture-collection",
  slug: "omni",
  title: "Omni",
  partOfSlugs: ["book-of-mormon"],
  position: 6,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "omni",
} as const satisfies ScriptureCollection
