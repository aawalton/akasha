import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const embriaGrasstongue = {
  id: "01a0b70a-6aa0-7b03-97d3-5c040e1106ff",
  type: "page-type/world-character",
  slug: "embria-grasstongue",
  title: "Embria",
  world: "world/the-wandering-inn",
  firstChapter: 254,
  lastChapter: 254,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
