import type { Fandom } from "akasha/alan/collection/watching/fandom/fandom.page-type.types.ts"

export const accelWorld = {
  id: "01a06808-5077-7000-a793-81237b865c74",
  type: "page-type/fandom",
  slug: "accel-world",
  title: "Accel World",
  partOfCollections: ["fandom-collection/anime-fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "completed",
  grade: "B",
} as const satisfies Fandom
