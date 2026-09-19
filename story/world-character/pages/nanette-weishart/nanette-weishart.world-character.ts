import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const nanetteWeishart = {
  id: "01a0b70c-020b-7781-b9a2-396856e5cfc2",
  type: "page-type/world-character",
  slug: "nanette-weishart",
  title: "Nanette Weishart",
  world: "world/the-wandering-inn",
  firstChapter: 602,
  lastChapter: 791,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
