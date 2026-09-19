import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const chaldion = {
  id: "01a0b709-fcb6-710f-9940-a39cc4fd8416",
  type: "page-type/world-character",
  slug: "chaldion",
  title: "Chaldion",
  world: "world/the-wandering-inn",
  firstChapter: 352,
  lastChapter: 793,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
