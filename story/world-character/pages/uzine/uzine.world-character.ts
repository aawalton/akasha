import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const uzine = {
  id: "01a0b70d-8370-7b17-9bf2-c5bfac1ed0ba",
  type: "page-type/world-character",
  slug: "uzine",
  title: "Uzine",
  world: "world/the-wandering-inn",
  firstChapter: 551,
  lastChapter: 582,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
