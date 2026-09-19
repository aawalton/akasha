import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const califor = {
  id: "01a0b707-8f0b-7b06-8c7b-0edbd9b01834",
  type: "page-type/world-character",
  slug: "califor",
  title: "Miss Califor",
  world: "world/the-wandering-inn",
  firstChapter: 351,
  lastChapter: 495,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
