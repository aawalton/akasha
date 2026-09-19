import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const tallisStormbreaker = {
  id: "01a0b70d-12c9-7457-9b46-51f16cf69261",
  type: "page-type/world-character",
  slug: "tallis-stormbreaker",
  title: "Tallis Stormbreaker",
  world: "world/the-wandering-inn",
  firstChapter: 235,
  lastChapter: 235,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
