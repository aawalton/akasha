import type { Fandom } from "akasha/alan/collection/watching/fandom/fandom.page-type.types.ts"

export const dcExtendedUniverse = {
  id: "01a06808-5077-7003-bb1d-2f8939282527",
  type: "page-type/fandom",
  slug: "dc-extended-universe",
  title: "DC Extended Universe",
  partOfCollections: ["fandom-collection/superhero-fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "paused",
  createdAt: "2026-09-03T16:09:30.487Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Fandom
