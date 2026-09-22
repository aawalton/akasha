import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const chiefWarriorMerish = {
  id: "01a0b709-fe4c-76f0-b325-8ab94e0d0742",
  type: "page-type/world-character",
  slug: "chief-warrior-merish",
  title: "Merish",
  world: "world/the-wandering-inn",
  appearanceCount: 1,
  firstChapter: 437,
  lastChapter: 437,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
