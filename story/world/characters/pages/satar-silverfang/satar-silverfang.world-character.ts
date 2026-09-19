import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const satarSilverfang = {
  id: "01a0b70c-ecf0-716a-86f0-f750358cf281",
  type: "page-type/world-character",
  slug: "satar-silverfang",
  title: "Satar Silverfang",
  world: "world/the-wandering-inn",
  firstChapter: 578,
  lastChapter: 578,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
