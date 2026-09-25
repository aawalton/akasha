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
} as const satisfies FandomCollection
