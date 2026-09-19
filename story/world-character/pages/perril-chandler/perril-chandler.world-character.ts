import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const perrilChandler = {
  id: "01a0b70c-29a1-7e12-9631-eb3df13d909f",
  type: "page-type/world-character",
  slug: "perril-chandler",
  title: "Perril Chandler",
  world: "world/the-wandering-inn",
  firstChapter: 502,
  lastChapter: 506,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
