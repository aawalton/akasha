import type { ScriptureCollection } from "../scripture-collection.page-type.ts"

export const titus = {
  id: "01a06808-34da-702e-8122-9a0f96b204a0",
  pageTypeSlug: "scripture-collection",
  type: "scripture-collection",
  slug: "titus",
  title: "Titus",
  partOfCollections: ["new-testament"],
  position: 17,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalId: "titus",
} as const satisfies ScriptureCollection
