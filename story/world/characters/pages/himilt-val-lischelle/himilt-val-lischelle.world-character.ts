import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const himiltValLischelle = {
  id: "01a0b70a-fdd3-7e1d-a8f1-7b653922d57b",
  type: "page-type/world-character",
  slug: "himilt-val-lischelle",
  title: "Himilt val Lischelle-Drakle",
  world: "world/the-wandering-inn",
  firstChapter: 592,
  lastChapter: 592,
  characterClaims: "jsonl",
  aliasOf: "world-character/himilt",
} as const satisfies WorldCharacter
