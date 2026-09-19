import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const mieve = {
  id: "01a0b70b-eaf7-77ce-bae0-803ba15adf01",
  type: "page-type/world-character",
  slug: "mieve",
  title: "the modified Fraerling",
  world: "world/the-wandering-inn",
  firstChapter: 803,
  lastChapter: 803,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
