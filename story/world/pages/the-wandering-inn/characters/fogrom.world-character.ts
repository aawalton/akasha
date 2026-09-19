import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const fogrom = {
  id: "01a0b70a-8b5b-732f-a526-bb1db7ade1c7",
  type: "page-type/world-character",
  slug: "fogrom",
  title: "Fogrom",
  world: "world/the-wandering-inn",
  firstChapter: 664,
  lastChapter: 664,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
