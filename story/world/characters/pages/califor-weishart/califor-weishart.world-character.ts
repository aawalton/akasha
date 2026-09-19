import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const califorWeishart = {
  id: "01a0b707-8f43-7e3c-b358-9ab910a72264",
  type: "page-type/world-character",
  slug: "califor-weishart",
  title: "Califor Weishart",
  world: "world/the-wandering-inn",
  firstChapter: 362,
  lastChapter: 362,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
