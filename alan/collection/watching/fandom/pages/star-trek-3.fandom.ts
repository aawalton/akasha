import type { Fandom } from "akasha/alan/collection/watching/fandom/fandom.page-type.types.ts"

export const starTrek3 = {
  id: "01a06808-5078-7008-8695-323b30891ef7",
  type: "page-type/fandom",
  slug: "star-trek-3",
  title: "Star Trek",
  partOfCollections: ["fandom-collection/science-fiction-fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "paused",
  grade: "A",
} as const satisfies Fandom
