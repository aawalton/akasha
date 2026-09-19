import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const mireden = {
  id: "01a0b70b-eec8-7f77-aa2d-13a0896c44af",
  type: "page-type/world-character",
  slug: "mireden",
  title: "Lord Mireden Raithland",
  world: "world/the-wandering-inn",
  firstChapter: 790,
  lastChapter: 790,
  characterClaims: "jsonl",
  aliasOf: "world-character/mireden-raithland",
} as const satisfies WorldCharacter
