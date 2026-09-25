import type { Fandom } from "akasha/alan/collection/watching/fandom/fandom.page-type.types.ts"

export const marvelTelevision = {
  id: "01a06808-5078-7003-bfb0-030d89cfba9f",
  type: "page-type/fandom",
  slug: "marvel-television",
  title: "Marvel Television",
  partOfCollections: ["fandom-collection/superhero-fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "paused",
} as const satisfies Fandom
