import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const himiltDrakle = {
  id: "01a0b70a-fd63-7ade-a4c5-c1cdb8dec7f2",
  type: "page-type/world-character",
  slug: "himilt-drakle",
  title: "Himilt val Lischelle-Drakle",
  world: "world/the-wandering-inn",
  firstChapter: 452,
  lastChapter: 452,
  characterClaims: "jsonl",
  aliasOf: "world-character/himilt",
} as const satisfies WorldCharacter
