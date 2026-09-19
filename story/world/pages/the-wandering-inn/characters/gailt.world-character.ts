import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const gailt = {
  id: "01a0b70a-8f4f-7a00-9a4f-8fb35fee4e6b",
  type: "page-type/world-character",
  slug: "gailt",
  title: "Gailt",
  world: "world/the-wandering-inn",
  firstChapter: 358,
  lastChapter: 358,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
