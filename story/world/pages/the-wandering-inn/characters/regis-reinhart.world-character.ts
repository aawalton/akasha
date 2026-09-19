import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const regisReinhart = {
  id: "01a0b70c-8b44-7320-824f-c4669e2299e7",
  type: "page-type/world-character",
  slug: "regis-reinhart",
  title: "Regis Reinhart",
  world: "world/the-wandering-inn",
  firstChapter: 208,
  lastChapter: 664,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
