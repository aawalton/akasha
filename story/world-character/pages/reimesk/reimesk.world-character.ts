import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const reimesk = {
  id: "01a0b70c-8cdb-7dac-a8a3-5a91bde34817",
  type: "page-type/world-character",
  slug: "reimesk",
  title: "Reimesk",
  world: "world/the-wandering-inn",
  firstChapter: 724,
  lastChapter: 724,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
