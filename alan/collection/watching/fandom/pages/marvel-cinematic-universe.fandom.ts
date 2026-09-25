import type { Fandom } from "akasha/alan/collection/watching/fandom/fandom.page-type.types.ts"

export const marvelCinematicUniverse = {
  id: "01a06808-5078-7002-b5c5-a97c10734575",
  type: "page-type/fandom",
  slug: "marvel-cinematic-universe",
  title: "Marvel Cinematic Universe",
  partOfCollections: ["fandom-collection/superhero-fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "paused",
} as const satisfies Fandom
