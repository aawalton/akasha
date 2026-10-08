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
  createdAt: "2026-09-03T16:09:30.488Z",
  updatedAt: "2026-09-25T12:50:49.000Z",
} as const satisfies Fandom
