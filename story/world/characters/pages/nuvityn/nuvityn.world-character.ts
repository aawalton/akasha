import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const nuvityn = {
  id: "01a0b70c-136a-77ed-8084-c638df84f382",
  type: "page-type/world-character",
  slug: "nuvityn",
  title: "Nuvityn",
  world: "world/the-wandering-inn",
  firstChapter: 626,
  lastChapter: 774,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
