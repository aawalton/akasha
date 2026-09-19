import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const femar = {
  id: "01a0b70a-7e96-7a12-bf28-67eb27af6c30",
  type: "page-type/world-character",
  slug: "femar",
  title: "Femar",
  world: "world/the-wandering-inn",
  firstChapter: 484,
  lastChapter: 484,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
