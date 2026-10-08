import type { FandomCollection } from "akasha/alan/collection/watching/fandom-collection/fandom-collection.page-type.types.ts"

export const superheroFandoms = {
  id: "01a06808-5f7f-7004-af84-eb6d8c150292",
  type: "page-type/fandom-collection",
  slug: "superhero-fandoms",
  title: "Superhero Fandoms",
  partOfCollections: ["fandom-collection/fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-applicable",
  createdAt: "2026-09-03T16:09:34.335Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies FandomCollection
