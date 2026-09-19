import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const silveran = {
  id: "01a0b70d-0165-7745-b581-342b04e7aa7e",
  type: "page-type/world-character",
  slug: "silveran",
  title: "Silveran",
  world: "world/the-wandering-inn",
  firstChapter: 483,
  lastChapter: 817,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
