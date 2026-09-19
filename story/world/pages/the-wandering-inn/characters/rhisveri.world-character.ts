import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const rhisveri = {
  id: "01a0b70c-967c-71b3-97f6-2591e5f465ab",
  type: "page-type/world-character",
  slug: "rhisveri",
  title: "Rhisveri Zessoprical",
  world: "world/the-wandering-inn",
  firstChapter: 524,
  lastChapter: 820,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
