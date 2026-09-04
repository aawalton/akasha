import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const daniel = {
  id: "01a06808-34d9-701c-85ed-9cba032f0624",
  pageTypeSlug: "scripture-collection",
  slug: "daniel",
  title: "Daniel",
  partOfSlugs: ["old-testament"],
  position: 27,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
  externalId: "daniel",
} as const satisfies ScriptureCollection
