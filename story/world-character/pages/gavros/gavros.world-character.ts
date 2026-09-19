import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const gavros = {
  id: "01a0b70a-93d1-7460-9c73-83ade3a2f804",
  type: "page-type/world-character",
  slug: "gavros",
  title: "Gavros",
  world: "world/the-wandering-inn",
  firstChapter: 637,
  lastChapter: 637,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
