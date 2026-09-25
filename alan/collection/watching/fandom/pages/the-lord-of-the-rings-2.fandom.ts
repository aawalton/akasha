import type { Fandom } from "akasha/alan/collection/watching/fandom/fandom.page-type.types.ts"

export const theLordOfTheRings2 = {
  id: "01a06808-5078-700c-ac21-d87190de18fb",
  type: "page-type/fandom",
  slug: "the-lord-of-the-rings-2",
  title: "The Lord of The Rings",
  partOfCollections: ["fandom-collection/fantasy-fandoms"],
  position: 0,
  ownLength: 0,
  ownProgress: 0,
  unit: "unit/words",
  status: "paused",
  grade: "A",
} as const satisfies Fandom
