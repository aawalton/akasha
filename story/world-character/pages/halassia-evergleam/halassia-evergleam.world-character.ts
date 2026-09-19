import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const halassiaEvergleam = {
  id: "01a0b70a-ee2a-79f5-be71-d615c5ad4d32",
  type: "page-type/world-character",
  slug: "halassia-evergleam",
  title: "Halassia Evergleam",
  world: "world/the-wandering-inn",
  firstChapter: 303,
  lastChapter: 303,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
