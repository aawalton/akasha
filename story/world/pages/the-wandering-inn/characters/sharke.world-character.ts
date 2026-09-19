import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const sharke = {
  id: "01a0b70c-fb4c-70e5-9db6-b4c6ca978432",
  type: "page-type/world-character",
  slug: "sharke",
  title: "Sharke",
  world: "world/the-wandering-inn",
  firstChapter: 792,
  lastChapter: 792,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
