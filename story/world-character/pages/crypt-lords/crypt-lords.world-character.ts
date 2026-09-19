import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const cryptLords = {
  id: "01a0b70a-0c41-7445-9bf4-9e6d60f20ba2",
  type: "page-type/world-character",
  slug: "crypt-lords",
  title: "Crypt Lords",
  world: "world/the-wandering-inn",
  firstChapter: 364,
  lastChapter: 364,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
