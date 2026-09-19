import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const eirethVersh = {
  id: "01a0b70a-23b6-7974-b60f-b0a8315e8799",
  type: "page-type/world-character",
  slug: "eireth-versh",
  title: "Eireth Versh",
  world: "world/the-wandering-inn",
  firstChapter: 777,
  lastChapter: 777,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
