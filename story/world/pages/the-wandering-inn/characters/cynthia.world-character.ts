import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const cynthia = {
  id: "01a0b70a-0d7f-7451-bc0f-adc21de2ef19",
  type: "page-type/world-character",
  slug: "cynthia",
  title: "Cynthia",
  world: "world/the-wandering-inn",
  firstChapter: 97,
  lastChapter: 215,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
