import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const terresHangclaw = {
  id: "01a0b70d-1904-7b72-9293-c4540f273e7b",
  type: "page-type/world-character",
  slug: "terres-hangclaw",
  title: "Terres Hangclaw",
  world: "world/the-wandering-inn",
  firstChapter: 103,
  lastChapter: 103,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
