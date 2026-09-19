import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const fool = {
  id: "01a0b70a-8bcc-7077-a3e2-cfeb2ba9f286",
  type: "page-type/world-character",
  slug: "fool",
  title: "The Fool",
  world: "world/the-wandering-inn",
  firstChapter: 218,
  lastChapter: 218,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
