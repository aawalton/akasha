import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const mrshaDuMarquin = {
  id: "01a0b70b-fae3-767b-bdd2-3ab69c53c5a4",
  type: "page-type/world-character",
  slug: "mrsha-du-marquin",
  title: "Mrsha",
  world: "world/the-wandering-inn",
  firstChapter: 434,
  lastChapter: 740,
  characterClaims: "jsonl",
  aliasOf: "world-character/mrsha",
} as const satisfies WorldCharacter
