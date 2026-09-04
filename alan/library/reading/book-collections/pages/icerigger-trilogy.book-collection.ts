import type { BookCollection } from "../book-collection.page-type.ts"

export const iceriggerTrilogy = {
  id: "01a06808-148e-702c-aa1d-3b992d1c6307",
  pageTypeSlug: "book-collection",
  slug: "icerigger-trilogy",
  title: "Icerigger Trilogy",
  partOfSlugs: ["alan-dean-foster"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unitSlug: "words",
  status: "not-started",
} as const satisfies BookCollection
