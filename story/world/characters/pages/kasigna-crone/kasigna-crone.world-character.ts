import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const kasignaCrone = {
  id: "01a0b70b-23d7-7e6f-b930-127221ed541a",
  type: "page-type/world-character",
  slug: "kasigna-crone",
  title: "the Crone",
  world: "world/the-wandering-inn",
  firstChapter: 741,
  lastChapter: 741,
  characterClaims: "jsonl",
  aliasOf: "world-character/kasigna",
} as const satisfies WorldCharacter
