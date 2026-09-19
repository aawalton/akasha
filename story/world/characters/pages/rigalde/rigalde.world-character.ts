import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const rigalde = {
  id: "01a0b70c-98c1-79ec-9990-cb7ed90cbfda",
  type: "page-type/world-character",
  slug: "rigalde",
  title: "Rigalde",
  world: "world/the-wandering-inn",
  firstChapter: 815,
  lastChapter: 815,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
