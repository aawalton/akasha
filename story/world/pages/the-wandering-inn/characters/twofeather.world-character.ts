import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const twofeather = {
  id: "01a0b70d-7775-75b6-82dc-a143c87d1ae0",
  type: "page-type/world-character",
  slug: "twofeather",
  title: "Twofeather",
  world: "world/the-wandering-inn",
  firstChapter: 290,
  lastChapter: 290,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
