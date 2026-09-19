import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const hawk = {
  id: "01a0b70a-f348-736b-906c-2f397766fab6",
  type: "page-type/world-character",
  slug: "hawk",
  title: "Hawk",
  world: "world/the-wandering-inn",
  firstChapter: 65,
  lastChapter: 441,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
