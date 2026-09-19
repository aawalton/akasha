import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const silvenia = {
  id: "01a0b70d-00bc-7887-bd3f-9a90ec76cf26",
  type: "page-type/world-character",
  slug: "silvenia",
  title: "Silvenia",
  world: "world/the-wandering-inn",
  firstChapter: 439,
  lastChapter: 710,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
