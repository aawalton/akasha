import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const mistreq = {
  id: "01a0b70b-f08c-75fb-b085-ecec9849e6d8",
  type: "page-type/world-character",
  slug: "mistreq",
  title: "Mistreq",
  world: "world/the-wandering-inn",
  firstChapter: 807,
  lastChapter: 807,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
