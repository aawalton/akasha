import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const theNecromancer = {
  id: "01a0b70d-1f70-75bc-80ff-0146a9db2bbc",
  type: "page-type/world-character",
  slug: "the-necromancer",
  title: "the Necromancer",
  world: "world/the-wandering-inn",
  firstChapter: 193,
  lastChapter: 193,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
