import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const caveGoblin = {
  id: "01a0b709-f7b6-72e4-a5cf-641b195f151d",
  type: "page-type/world-character",
  slug: "cave-goblin",
  title: "the creature",
  world: "world/the-wandering-inn",
  firstChapter: 277,
  lastChapter: 277,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
