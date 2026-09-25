import type { ShowCollection } from "akasha/alan/collection/watching/show-collection/show-collection.page-type.types.ts"

export const shows = {
  id: "01a06808-6a77-700e-a079-27189a28901b",
  type: "page-type/show-collection",
  slug: "shows",
  title: "Shows",
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/minutes",
  status: "not-applicable",
} as const satisfies ShowCollection
