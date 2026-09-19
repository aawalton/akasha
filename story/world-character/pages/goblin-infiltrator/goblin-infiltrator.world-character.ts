import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const goblinInfiltrator = {
  id: "01a0b70a-a150-709e-96a7-ae6b61816b7c",
  type: "page-type/world-character",
  slug: "goblin-infiltrator",
  title: "the infiltrator Goblin",
  world: "world/the-wandering-inn",
  firstChapter: 204,
  lastChapter: 204,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
