import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const zeciEl = {
  id: "01a0b70d-e943-7da1-a3f6-666f483af9a7",
  type: "page-type/world-character",
  slug: "zeci-el",
  title: "Zeci",
  world: "world/the-wandering-inn",
  firstChapter: 416,
  lastChapter: 416,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
