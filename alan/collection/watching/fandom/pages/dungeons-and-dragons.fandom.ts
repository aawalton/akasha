import type { Fandom } from "akasha/alan/collection/watching/fandom/fandom.page-type.types.ts"

export const dungeonsAndDragons = {
  id: "01a06808-5077-7007-87c2-aaf641786c0e",
  type: "page-type/fandom",
  slug: "dungeons-and-dragons",
  title: "Dungeons and Dragons",
  partOfCollections: ["fandom-collection/fantasy-fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
  grade: "B",
} as const satisfies Fandom
