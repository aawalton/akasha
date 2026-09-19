import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const lillianGriffinRider = {
  id: "01a0b70b-847d-75ec-aa50-b841158a02ca",
  type: "page-type/world-character",
  slug: "lillian-griffin-rider",
  title: "Lillian",
  world: "world/the-wandering-inn",
  firstChapter: 715,
  lastChapter: 715,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
