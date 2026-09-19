import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const milaw = {
  id: "01a0b70b-eba2-734f-9f84-8cf020458a45",
  type: "page-type/world-character",
  slug: "milaw",
  title: "Milaw",
  world: "world/the-wandering-inn",
  firstChapter: 606,
  lastChapter: 606,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
