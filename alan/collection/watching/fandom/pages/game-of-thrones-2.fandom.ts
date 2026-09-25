import type { Fandom } from "akasha/alan/collection/watching/fandom/fandom.page-type.types.ts"

export const gameOfThrones2 = {
  id: "01a06808-5077-7009-9c65-b22c71412fb6",
  type: "page-type/fandom",
  slug: "game-of-thrones-2",
  title: "Game of Thrones",
  partOfCollections: ["fandom-collection/fantasy-fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Fandom
