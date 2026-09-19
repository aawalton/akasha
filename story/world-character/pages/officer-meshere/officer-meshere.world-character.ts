import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const officerMeshere = {
  id: "01a0b70c-1575-7295-914a-52ddb5c87d6e",
  type: "page-type/world-character",
  slug: "officer-meshere",
  title: "Me'shere",
  world: "world/the-wandering-inn",
  firstChapter: 717,
  lastChapter: 717,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
