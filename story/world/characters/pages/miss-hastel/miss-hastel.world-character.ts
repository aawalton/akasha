import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const missHastel = {
  id: "01a0b70b-f019-79f3-82cd-c40b4ec6645b",
  type: "page-type/world-character",
  slug: "miss-hastel",
  title: "Miss Hastel",
  world: "world/the-wandering-inn",
  firstChapter: 317,
  lastChapter: 317,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
