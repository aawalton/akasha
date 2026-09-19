import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const wikir = {
  id: "01a0b70d-9db2-7ba8-8021-75b0475123ef",
  type: "page-type/world-character",
  slug: "wikir",
  title: "Wikir",
  world: "world/the-wandering-inn",
  firstChapter: 341,
  lastChapter: 341,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
