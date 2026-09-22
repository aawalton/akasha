import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const twiMars = {
  id: "01a0b70d-759c-78a5-a2af-139e3582a923",
  type: "page-type/world-character",
  slug: "twi-mars",
  title: "Mars",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 180,
  lastChapter: 180,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
