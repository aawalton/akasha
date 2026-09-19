import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const emme = {
  id: "01a0b70a-6c3c-71b4-ae0f-57629becd60c",
  type: "page-type/world-character",
  slug: "emme",
  title: "Emme",
  world: "world/the-wandering-inn",
  firstChapter: 382,
  lastChapter: 382,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
