import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const krshia = {
  id: "01a0b70b-6f0c-7068-914e-ba0c07e9f55d",
  type: "page-type/world-character",
  slug: "krshia",
  title: "Krshia",
  world: "world/the-wandering-inn",
  firstChapter: 20,
  lastChapter: 821,
  characterClaims: "jsonl",
  aliasOf: "world-character/krshia-silverfang",
} as const satisfies WorldCharacter
