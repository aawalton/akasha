import type { Fandom } from "akasha/alan/collection/watching/fandom/fandom.page-type.types.ts"

export const dcUniverse = {
  id: "01a06808-5077-7004-8c32-194339671fda",
  type: "page-type/fandom",
  slug: "dc-universe",
  title: "DC Universe",
  partOfCollections: ["fandom-collection/superhero-fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "paused",
} as const satisfies Fandom
