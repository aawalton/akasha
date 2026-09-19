import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const falene = {
  id: "01a0b70a-79f2-7a0b-9a76-d61a2915a101",
  type: "page-type/world-character",
  slug: "falene",
  title: "Falene Skystrall",
  world: "world/the-wandering-inn",
  firstChapter: 231,
  lastChapter: 814,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
