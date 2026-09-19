import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const ophala = {
  id: "01a0b70c-1956-7a85-80d6-3a51fa555a5e",
  type: "page-type/world-character",
  slug: "ophala",
  title: "Ophala",
  world: "world/the-wandering-inn",
  firstChapter: 789,
  lastChapter: 789,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
