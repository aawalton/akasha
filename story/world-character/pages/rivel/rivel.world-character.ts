import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const rivel = {
  id: "01a0b70c-9ae8-7b4e-aec7-8b38009ee21e",
  type: "page-type/world-character",
  slug: "rivel",
  title: "Rivel",
  world: "world/the-wandering-inn",
  firstChapter: 312,
  lastChapter: 731,
  characterClaims: "jsonl",
  aliasOf: "world-character/rivel-lischelle-drakle",
} as const satisfies WorldCharacter
