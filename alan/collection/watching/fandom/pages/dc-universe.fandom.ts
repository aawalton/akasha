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
  createdAt: "2026-09-03T16:09:30.487Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Fandom
