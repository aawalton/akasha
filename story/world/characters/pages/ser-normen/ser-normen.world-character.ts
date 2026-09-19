import type { WorldCharacter } from "akasha/story/world/characters/world-character.page-type.types.ts"

export const serNormen = {
  id: "01a0b70c-f405-7e88-8fa5-a7cb74893bc0",
  type: "page-type/world-character",
  slug: "ser-normen",
  title: "Ser Normen",
  world: "world/the-wandering-inn",
  firstChapter: 769,
  lastChapter: 769,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
