import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const leilaSpringwalker = {
  id: "01a0b70b-7fe3-7ead-8985-e0aa66cb64fc",
  type: "page-type/world-character",
  slug: "leila-springwalker",
  title: "Leila Springwalker",
  world: "world/the-wandering-inn",
  firstChapter: 710,
  lastChapter: 710,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
