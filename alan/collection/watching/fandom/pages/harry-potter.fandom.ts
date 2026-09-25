import type { Fandom } from "akasha/alan/collection/watching/fandom/fandom.page-type.types.ts"

export const harryPotter = {
  id: "01a06808-5077-700a-bee0-53a0f70ebcf1",
  type: "page-type/fandom",
  slug: "harry-potter",
  title: "Harry Potter",
  partOfCollections: ["fandom-collection/fantasy-fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "paused",
  grade: "B",
} as const satisfies Fandom
