import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const mageElementalist = {
  id: "01a0b70b-9606-735f-aedc-8b04201f9e57",
  type: "page-type/world-character",
  slug: "mage-elementalist",
  title: "the [Elementalist] mage",
  world: "world/the-wandering-inn",
  firstChapter: 30,
  lastChapter: 30,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
