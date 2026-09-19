import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const quiteil = {
  id: "01a0b70c-7c63-72bc-b8f9-7303b63ae7a6",
  type: "page-type/world-character",
  slug: "quiteil",
  title: "Quiteil",
  world: "world/the-wandering-inn",
  firstChapter: 439,
  lastChapter: 439,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
