import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const greydathOfBlades = {
  id: "01a0b70a-eae8-7ee7-8204-9029d29b11c9",
  type: "page-type/world-character",
  slug: "greydath-of-blades",
  title: "Greydath",
  world: "world/the-wandering-inn",
  firstChapter: 687,
  lastChapter: 687,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
