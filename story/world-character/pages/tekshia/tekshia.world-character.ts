import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const tekshia = {
  id: "01a0b70d-141d-7d90-8bc2-96037495ae84",
  type: "page-type/world-character",
  slug: "tekshia",
  title: "Tekshia Silverfang",
  world: "world/the-wandering-inn",
  firstChapter: 65,
  lastChapter: 386,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
