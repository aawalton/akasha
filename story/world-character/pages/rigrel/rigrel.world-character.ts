import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const rigrel = {
  id: "01a0b70c-98f3-7e05-9365-05cb429a7975",
  type: "page-type/world-character",
  slug: "rigrel",
  title: "Rigrel",
  world: "world/the-wandering-inn",
  firstChapter: 794,
  lastChapter: 794,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
