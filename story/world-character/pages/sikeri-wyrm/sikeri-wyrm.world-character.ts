import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const sikeriWyrm = {
  id: "01a0b70d-0016-7141-bb5d-d22324f96127",
  type: "page-type/world-character",
  slug: "sikeri-wyrm",
  title: "the Wyrm",
  world: "world/the-wandering-inn",
  firstChapter: 475,
  lastChapter: 551,
  characterClaims: "jsonl",
  aliasOf: "world-character/sikeri",
} as const satisfies WorldCharacter
