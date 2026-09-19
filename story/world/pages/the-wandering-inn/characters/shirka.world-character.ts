import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const shirka = {
  id: "01a0b70c-fd0c-7ad8-897a-2d01379f0286",
  type: "page-type/world-character",
  slug: "shirka",
  title: "Shirka",
  world: "world/the-wandering-inn",
  firstChapter: 464,
  lastChapter: 793,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
