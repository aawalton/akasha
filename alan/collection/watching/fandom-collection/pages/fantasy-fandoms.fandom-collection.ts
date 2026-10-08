import type { FandomCollection } from "akasha/alan/collection/watching/fandom-collection/fandom-collection.page-type.types.ts"

export const fantasyFandoms = {
  id: "01a06808-5f7f-7002-bcc1-c5d4d7487a5f",
  type: "page-type/fandom-collection",
  slug: "fantasy-fandoms",
  title: "Fantasy Fandoms",
  partOfCollections: ["fandom-collection/fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-applicable",
  createdAt: "2026-09-03T16:09:34.335Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies FandomCollection
