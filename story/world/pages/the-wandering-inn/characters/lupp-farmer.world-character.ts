import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const luppFarmer = {
  id: "01a0b70b-9075-7c9a-818f-295f3a68d621",
  type: "page-type/world-character",
  slug: "lupp-farmer",
  title: "Lupp",
  world: "world/the-wandering-inn",
  firstChapter: 337,
  lastChapter: 337,
  characterClaims: "jsonl",
  aliasOf: "world-character/lupp",
} as const satisfies WorldCharacter
