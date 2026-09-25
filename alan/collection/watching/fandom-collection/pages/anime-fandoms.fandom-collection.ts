import type { FandomCollection } from "akasha/alan/collection/watching/fandom-collection/fandom-collection.page-type.types.ts"

export const animeFandoms = {
  id: "01a06808-5f7f-7000-afdb-200adf4ef0cc",
  type: "page-type/fandom-collection",
  slug: "anime-fandoms",
  title: "Anime Fandoms",
  partOfCollections: ["fandom-collection/fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-applicable",
  grade: "B",
} as const satisfies FandomCollection
