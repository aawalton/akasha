import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const merindue = {
  id: "01a0b70b-e92d-764b-8363-07e7a9be47a6",
  type: "page-type/world-character",
  slug: "merindue",
  title: "Merindue",
  world: "world/the-wandering-inn",
  firstChapter: 523,
  lastChapter: 523,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
