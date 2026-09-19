import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ceriaGreatGrandmother = {
  id: "01a0b709-faa2-761f-a48c-69c618cb3ea9",
  type: "page-type/world-character",
  slug: "ceria-great-grandmother",
  title: "Ceria's great-grandmother",
  world: "world/the-wandering-inn",
  firstChapter: 133,
  lastChapter: 133,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
