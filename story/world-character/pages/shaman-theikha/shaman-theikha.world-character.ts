import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const shamanTheikha = {
  id: "01a0b70c-fadf-733c-9e3c-76ab2d082cea",
  type: "page-type/world-character",
  slug: "shaman-theikha",
  title: "Shaman Theikha",
  world: "world/the-wandering-inn",
  firstChapter: 588,
  lastChapter: 588,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
