import type { Fandom } from "akasha/alan/library/watching/fandoms/fandom.page-type.types.ts"

export const harryPotter = {
  id: "01a06808-5077-700a-bee0-53a0f70ebcf1",
  type: "fandom",
  slug: "harry-potter",
  title: "Harry Potter",
  partOfCollections: ["fantasy-fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "words",
  status: "paused",
  rank: "B",
} as const satisfies Fandom
