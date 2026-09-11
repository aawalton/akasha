import type { ScriptureCollection } from "akasha/alan/library/reading/scripture-collections/scripture-collection.page-type.types.ts"

export const josephSmithHistory = {
  id: "01a06808-34da-700b-88ee-465a728e0f46",
  type: "scripture-collection",
  slug: "joseph-smith-history",
  title: "Joseph Smith--History",
  partOfCollections: ["pearl-of-great-price"],
  position: 4,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "not-started",
  externalId: "josephsmithhistory",
} as const satisfies ScriptureCollection
