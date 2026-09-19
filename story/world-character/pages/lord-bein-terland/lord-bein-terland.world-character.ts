import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const lordBeinTerland = {
  id: "01a0b70b-88ed-7b86-8760-15dafff1d7cc",
  type: "page-type/world-character",
  slug: "lord-bein-terland",
  title: "Lord Bein Terland",
  world: "world/the-wandering-inn",
  firstChapter: 416,
  lastChapter: 416,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
