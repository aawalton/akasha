import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const typhenousPlagueMage = {
  id: "01a0b70d-794d-7841-adcf-af70dafd53b3",
  type: "page-type/world-character",
  slug: "typhenous-plague-mage",
  title: "Typhenous",
  world: "world/the-wandering-inn",
  firstChapter: 715,
  lastChapter: 715,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
