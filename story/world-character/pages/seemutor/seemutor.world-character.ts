import type { WorldCharacter } from "akasha/story/world-character/world-character.page-type.types.ts"

export const seemutor = {
  id: "01a0b70c-eff9-7096-b2be-1708abac2987",
  type: "page-type/world-character",
  slug: "seemutor",
  title: "Seemutor",
  world: "world/the-wandering-inn",
  firstChapter: 514,
  lastChapter: 671,
  characterClaims: "jsonl",
} as const satisfies WorldCharacter
