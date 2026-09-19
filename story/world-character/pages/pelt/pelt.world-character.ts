import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const pelt = {
  id: "01a0b70c-284b-73ff-9b35-dab0d371a3f5",
  type: "page-type/world-character",
  slug: "pelt",
  title: "Pelt",
  world: "world/the-wandering-inn",
  firstChapter: 324,
  lastChapter: 627,
  characterClaims: "jsonl",
  aliasOf: "world-character/pelt-dooristone",
} as const satisfies WorldCharacter
