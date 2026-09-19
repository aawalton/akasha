import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const nemor = {
  id: "01a0b70c-04f3-73a6-834b-faecc8200562",
  type: "page-type/world-character",
  slug: "nemor",
  title: "Nemor",
  world: "world/the-wandering-inn",
  firstChapter: 139,
  lastChapter: 140,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
