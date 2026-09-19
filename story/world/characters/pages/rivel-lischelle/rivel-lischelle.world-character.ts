import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const rivelLischelle = {
  id: "01a0b70c-9b22-751e-ab34-571a164bd56c",
  type: "page-type/world-character",
  slug: "rivel-lischelle",
  title: "Rivel Lischelle",
  world: "world/the-wandering-inn",
  firstChapter: 664,
  lastChapter: 664,
  characterClaims: "jsonl",
  aliasOf: "world-character/rivel-lischelle-drakle",
} as const satisfies WorldCharacter
