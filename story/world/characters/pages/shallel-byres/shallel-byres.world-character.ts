import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const shallelByres = {
  id: "01a0b70c-faa9-723f-afe3-3b4b84fdcd07",
  type: "page-type/world-character",
  slug: "shallel-byres",
  title: "Shallel Byres",
  world: "world/the-wandering-inn",
  firstChapter: 452,
  lastChapter: 452,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
