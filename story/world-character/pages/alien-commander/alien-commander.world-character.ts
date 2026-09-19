import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const alienCommander = {
  id: "01a0b707-69bf-7d8d-a65c-94629025f8d8",
  type: "page-type/world-character",
  slug: "alien-commander",
  title: "the Alien Commander",
  world: "world/the-wandering-inn",
  firstChapter: 481,
  lastChapter: 481,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
