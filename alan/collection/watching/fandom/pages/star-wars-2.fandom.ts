import type { Fandom } from "akasha/alan/collection/watching/fandom/fandom.page-type.types.ts"

export const starWars2 = {
  id: "01a06808-5078-7009-aef0-2de7f2a6dd95",
  type: "page-type/fandom",
  slug: "star-wars-2",
  title: "Star Wars",
  partOfCollections: ["fandom-collection/science-fiction-fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "paused",
  grade: "B",
} as const satisfies Fandom
