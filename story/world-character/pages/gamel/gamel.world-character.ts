import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const gamel = {
  id: "01a0b70a-902c-7c1c-aff4-b52b6fb4444a",
  type: "page-type/world-character",
  slug: "gamel",
  title: "Gamel",
  world: "world/the-wandering-inn",
  firstChapter: 138,
  lastChapter: 358,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
