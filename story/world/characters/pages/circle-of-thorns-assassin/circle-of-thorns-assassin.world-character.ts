import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const circleOfThornsAssassin = {
  id: "01a0b70a-00e8-76de-8741-cb7a57dae77c",
  type: "page-type/world-character",
  slug: "circle-of-thorns-assassin",
  title: "The Masked Assassin",
  world: "world/the-wandering-inn",
  firstChapter: 462,
  lastChapter: 462,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
