import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const quarassGermina = {
  id: "01a0b70c-795f-7879-84c8-4c300fe99ca2",
  type: "page-type/world-character",
  slug: "quarass-germina",
  title: "the Quarass of Germina",
  world: "world/the-wandering-inn",
  firstChapter: 323,
  lastChapter: 807,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
