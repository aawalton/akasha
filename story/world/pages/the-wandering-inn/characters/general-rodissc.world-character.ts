import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const generalRodissc = {
  id: "01a0b70a-95be-7666-869f-174f7fd0b55f",
  type: "page-type/world-character",
  slug: "general-rodissc",
  title: "General Rodissc",
  world: "world/the-wandering-inn",
  firstChapter: 662,
  lastChapter: 662,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
