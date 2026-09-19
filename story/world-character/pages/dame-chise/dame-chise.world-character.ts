import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const dameChise = {
  id: "01a0b70a-0f2c-788e-b265-759ce39d7164",
  type: "page-type/world-character",
  slug: "dame-chise",
  title: "Dame Chise",
  world: "world/the-wandering-inn",
  firstChapter: 378,
  lastChapter: 378,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
