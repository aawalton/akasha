import type { Fandom } from "akasha/alan/collection/watching/fandom/fandom.page-type.types.ts"

export const dune2 = {
  id: "01a06808-5077-7006-83db-b6a2466247b2",
  type: "page-type/fandom",
  slug: "dune-2",
  title: "Dune",
  partOfCollections: ["fandom-collection/science-fiction-fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "not-started",
} as const satisfies Fandom
