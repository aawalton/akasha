import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const chiefWarriorRometh = {
  id: "01a0b709-fe7a-7a7b-aba4-4b020ebbfdf1",
  type: "page-type/world-character",
  slug: "chief-warrior-rometh",
  title: "Chief Warrior Rometh",
  world: "world/the-wandering-inn",
  firstChapter: 58,
  lastChapter: 58,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
