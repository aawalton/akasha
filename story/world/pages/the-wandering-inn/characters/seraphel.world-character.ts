import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const seraphel = {
  id: "01a06580-2495-7b69-9ddc-edac330b6afc",
  type: "page-type/world-character",
  slug: "seraphel",
  title: "Seraphel",
  world: "world/the-wandering-inn",
  appearanceCount: 9,
  eventCount: 3,
  firstChapter: 512,
  lastChapter: 795,
  characterClaims: "jsonl",
  aliasOf: "world-character/seraphel-du-marquin",
  createdAt: "2026-09-03T04:21:31.925Z",
  updatedAt: "2026-09-25T15:41:02.000Z",
} as const satisfies WorldCharacter
