import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const collos = {
  id: "01a0b70a-0512-7e26-9e7c-44cfe41ea365",
  type: "page-type/world-character",
  slug: "collos",
  title: "Collos",
  world: "world/the-wandering-inn",
  firstChapter: 635,
  lastChapter: 636,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
