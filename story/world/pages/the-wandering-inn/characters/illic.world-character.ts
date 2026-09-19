import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const illic = {
  id: "01a0b70b-0836-7a36-a4ce-a98f38c9c86c",
  type: "page-type/world-character",
  slug: "illic",
  title: "Illic",
  world: "world/the-wandering-inn",
  firstChapter: 772,
  lastChapter: 772,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
