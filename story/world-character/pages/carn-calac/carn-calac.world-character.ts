import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const carnCalac = {
  id: "01a0b709-f4b3-71c7-bd19-e4598e43c5fa",
  type: "page-type/world-character",
  slug: "carn-calac",
  title: "Calac Crusand",
  world: "world/the-wandering-inn",
  firstChapter: 496,
  lastChapter: 496,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
