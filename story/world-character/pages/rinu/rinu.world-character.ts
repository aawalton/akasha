import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const rinu = {
  id: "01a0b70c-9a00-79cd-84ce-1f70c3822bd9",
  type: "page-type/world-character",
  slug: "rinu",
  title: "Rinu",
  world: "world/the-wandering-inn",
  firstChapter: 657,
  lastChapter: 657,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
