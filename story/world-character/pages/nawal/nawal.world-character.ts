import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const nawal = {
  id: "01a0b70c-0328-76e2-833a-89ca73c5994d",
  type: "page-type/world-character",
  slug: "nawal",
  title: "Nawalishifra",
  world: "world/the-wandering-inn",
  firstChapter: 324,
  lastChapter: 560,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
