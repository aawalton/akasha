import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const friekeFalcon = {
  id: "01a0b70a-8d22-77e8-8e08-808f8c79b259",
  type: "page-type/world-character",
  slug: "frieke-falcon",
  title: "Frieke",
  world: "world/the-wandering-inn",
  firstChapter: 514,
  lastChapter: 514,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
