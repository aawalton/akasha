import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const naumel = {
  id: "01a0b70c-027d-7079-8c6d-e7c1a87ab222",
  type: "page-type/world-character",
  slug: "naumel",
  title: "Naumel",
  world: "world/the-wandering-inn",
  firstChapter: 716,
  lastChapter: 718,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
