import type { Fandom } from "akasha/alan/collection/watching/fandom/fandom.page-type.types.ts"

export const swordArtOnline = {
  id: "01a06808-5078-700b-a7ee-e9261b7164ac",
  type: "page-type/fandom",
  slug: "sword-art-online",
  title: "Sword Art Online",
  partOfCollections: ["fandom-collection/anime-fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "paused",
  grade: "A",
} as const satisfies Fandom
