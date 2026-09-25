import type { Fandom } from "akasha/alan/collection/watching/fandom/fandom.page-type.types.ts"

export const battlestarGalactica = {
  id: "01a06808-5077-7002-8ed4-51e500a536f4",
  type: "page-type/fandom",
  slug: "battlestar-galactica",
  title: "Battlestar Galactica",
  partOfCollections: ["fandom-collection/science-fiction-fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Fandom
