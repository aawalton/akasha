import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const richardDavenport = {
  id: "01a0b70c-972b-7fe6-9bd0-8b5c82cd9f0d",
  type: "page-type/world-character",
  slug: "richard-davenport",
  title: "Richard Davenport",
  world: "world/the-wandering-inn",
  firstChapter: 215,
  lastChapter: 215,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
