import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const himiltLischelle = {
  id: "01a0b70a-fd9c-7a0a-93ef-07fc8c5fc209",
  type: "page-type/world-character",
  slug: "himilt-lischelle",
  title: "Himilt Lischelle",
  world: "world/the-wandering-inn",
  firstChapter: 664,
  lastChapter: 664,
  characterClaims: "jsonl",
  aliasOf: "world-character/himilt",
} as const satisfies WorldCharacter
