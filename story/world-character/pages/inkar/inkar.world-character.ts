import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const inkar = {
  id: "01a0b70b-0cce-7887-94c9-6cdda9920d14",
  type: "page-type/world-character",
  slug: "inkar",
  title: "Inkar the Traveller",
  world: "world/the-wandering-inn",
  firstChapter: 470,
  lastChapter: 711,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
