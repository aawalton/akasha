import type { Fandom } from "akasha/alan/collection/watching/fandom/fandom.page-type.types.ts"

export const stargate2 = {
  id: "01a06808-5078-700a-aaf3-cb8646644e12",
  type: "page-type/fandom",
  slug: "stargate-2",
  title: "Stargate",
  partOfCollections: ["fandom-collection/science-fiction-fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Fandom
