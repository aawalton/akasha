import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const rissaInkscale = {
  id: "01a0b70c-9a39-7694-ad5c-63d8bc76be7b",
  type: "page-type/world-character",
  slug: "rissa-inkscale",
  title: "Rissa Inkscale",
  world: "world/the-wandering-inn",
  firstChapter: 322,
  lastChapter: 322,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
