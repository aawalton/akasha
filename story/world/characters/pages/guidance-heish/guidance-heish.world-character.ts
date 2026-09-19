import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const guidanceHeish = {
  id: "01a0b70a-ed32-7b16-b79b-838fe59826a9",
  type: "page-type/world-character",
  slug: "guidance-heish",
  title: "Heish",
  world: "world/the-wandering-inn",
  firstChapter: 515,
  lastChapter: 515,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
