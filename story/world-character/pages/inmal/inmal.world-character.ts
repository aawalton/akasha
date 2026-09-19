import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const inmal = {
  id: "01a0b70b-0d41-7e76-b8f9-c164f4f56dda",
  type: "page-type/world-character",
  slug: "inmal",
  title: "Inmal",
  world: "world/the-wandering-inn",
  firstChapter: 789,
  lastChapter: 789,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
