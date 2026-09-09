import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const scriptureCollection2Kings = {
  id: "01a06808-34d9-700c-a0ca-a3aac8cf04b8",
  pageTypeSlug: "scripture-collection",
  type: "scripture-collection",
  slug: "scripture-collection-2-kings",
  title: "2 Kings",
  partOfCollections: ["old-testament"],
  position: 12,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalId: "2kings",
} as const satisfies ScriptureCollection
