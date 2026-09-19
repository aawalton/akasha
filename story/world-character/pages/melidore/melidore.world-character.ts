import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const melidore = {
  id: "01a0b70b-e4cc-7105-adcf-ca8b093a9c01",
  type: "page-type/world-character",
  slug: "melidore",
  title: "Melidore",
  world: "world/the-wandering-inn",
  firstChapter: 475,
  lastChapter: 724,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
