import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const elderCreler = {
  id: "01a0b70a-2670-718f-96fe-75554263538b",
  type: "page-type/world-character",
  slug: "elder-creler",
  title: "the creature in gestation",
  world: "world/the-wandering-inn",
  firstChapter: 795,
  lastChapter: 795,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
