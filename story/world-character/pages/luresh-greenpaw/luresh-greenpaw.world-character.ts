import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const lureshGreenpaw = {
  id: "01a0b70b-90ae-76f3-b77f-adbe8292414f",
  type: "page-type/world-character",
  slug: "luresh-greenpaw",
  title: "Luresh Greenpaw",
  world: "world/the-wandering-inn",
  firstChapter: 624,
  lastChapter: 624,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
