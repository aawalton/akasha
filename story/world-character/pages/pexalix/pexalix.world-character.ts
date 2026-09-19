import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const pexalix = {
  id: "01a0b70c-6ca1-72ff-97ca-4e2b3384e696",
  type: "page-type/world-character",
  slug: "pexalix",
  title: "Pexalix",
  world: "world/the-wandering-inn",
  firstChapter: 607,
  lastChapter: 607,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
