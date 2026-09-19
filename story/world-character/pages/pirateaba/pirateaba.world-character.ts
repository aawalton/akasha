import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const pirateaba = {
  id: "01a0b70c-6d90-7e2b-9945-59d929236aaf",
  type: "page-type/world-character",
  slug: "pirateaba",
  title: "pirateaba",
  world: "world/the-wandering-inn",
  firstChapter: 743,
  lastChapter: 801,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
