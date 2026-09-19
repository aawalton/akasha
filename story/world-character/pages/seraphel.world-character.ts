import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const seraphel = {
  id: "01a06580-2495-7b69-9ddc-edac330b6afc",
  type: "page-type/world-character",
  slug: "seraphel",
  title: "Seraphel",
  world: "world/the-wandering-inn",
  maxLevel: 35,
  eventCount: 3,
  firstChapter: 512,
  lastChapter: 795,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
