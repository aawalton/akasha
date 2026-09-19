import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const salamander = {
  id: "01a0b70c-a8ae-7229-a394-c8681ce21f28",
  type: "page-type/world-character",
  slug: "salamander",
  title: "Salamander",
  world: "world/the-wandering-inn",
  firstChapter: 692,
  lastChapter: 692,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
