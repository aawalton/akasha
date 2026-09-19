import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const graltonLycit = {
  id: "01a0b70a-e82b-797d-be90-dc318a23bea2",
  type: "page-type/world-character",
  slug: "gralton-lycit",
  title: "Gralton",
  world: "world/the-wandering-inn",
  firstChapter: 271,
  lastChapter: 271,
  characterClaims: "jsonl",
  aliasOf: "world-character/gralton",
} as const satisfies WorldCharacter
