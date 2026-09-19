import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const theCaptain = {
  id: "01a0b70d-1b7c-7adc-8443-d4b9fbf6068e",
  type: "page-type/world-character",
  slug: "the-captain",
  title: "the Captain of the Errant Traveller",
  world: "world/the-wandering-inn",
  firstChapter: 158,
  lastChapter: 158,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
