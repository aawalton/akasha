import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const ogreChieftain = {
  id: "01a0b70c-15ae-7207-acd5-ea504aef2a1f",
  type: "page-type/world-character",
  slug: "ogre-chieftain",
  title: "Ogre Chief",
  world: "world/the-wandering-inn",
  firstChapter: 378,
  lastChapter: 378,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
