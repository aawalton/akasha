import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const laedoniusDeviy = {
  id: "01a0b70b-76d7-7571-b5d1-a0e0db4c0ad1",
  type: "page-type/world-character",
  slug: "laedonius-deviy",
  title: "Laedonius Deviy",
  world: "world/the-wandering-inn",
  firstChapter: 583,
  lastChapter: 758,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
